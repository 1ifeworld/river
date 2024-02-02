import { AudioPlayer, VideoPlayer } from '@/client'
import { ItemSidebar } from '@/server'
import { Typography, Flex, Stack } from '@/design-system'
import { getReferenceWithId } from '@/gql'
import {
  type MediaAssetObject,
  ipfsUrlToCid,
  isAudio,
  isGlb,
  isImage,
  isMarkdown,
  isPdf,
  isVideo,
  w3sUrlFromCid,
} from '@/lib'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { match, P } from 'ts-pattern'
import * as React from 'react'
import { kv } from '@vercel/kv'

const Model = dynamic(
  () => import('../../../../components/client/renderers/ModelRenderer'),
  { ssr: false },
)

const MarkdownRenderer = dynamic(
  () => import('../../../../components/client/renderers/MarkdownRenderer'),
  { ssr: false },
)

const PdfViewer = dynamic(
  () => import('../../../../components/client/renderers/PDFViewer'),
  { ssr: false },
)

export default async function ItemPage({
  params,
}: {
  params: { id: string }
}) {
  const { reference } = await getReferenceWithId({
    id: params.id,
  })

  const itemMetadata = await kv.get<Pick<MediaAssetObject, 'value'>['value']>(
    reference?.pubRef?.uri as string,
  )

  const contentType = itemMetadata?.contentType as string

  let contentUrl: string | undefined

  if (
    itemMetadata?.contentType === 'model/gltf-binary' ||
    itemMetadata?.contentType === 'application/pdf' ||
    itemMetadata?.contentType === 'text/markdown' ||
    isAudio({ mimeType: itemMetadata?.contentType as string })
  ) {
    const cid = ipfsUrlToCid({ ipfsUrl: itemMetadata?.animationUri as string })
    contentUrl = w3sUrlFromCid({ cid })
  } else {
    const cid = ipfsUrlToCid({ ipfsUrl: itemMetadata?.image as string })
    contentUrl = w3sUrlFromCid({ cid })
  }

  const content = match(contentType)
    .with(
      P.when((type) => isImage({ mimeType: type })),
      () => (
        <div className="relative h-full md:mx-40">
          <Image
            className="object-contain"
            src={contentUrl as string}
            alt={itemMetadata?.name as string}
            fill
            quality={100}
            priority={true}
          />
        </div>
      ),
    )
    .with(
      P.when((type) => isVideo({ mimeType: type })),
      () => (
        <Flex className="h-full">
          <VideoPlayer playbackId={itemMetadata?.muxPlaybackId as string} />
        </Flex>
      ),
    )
    .with(
      P.when((type) => isAudio({ mimeType: type })),
      () => <AudioPlayer playbackId={itemMetadata?.muxPlaybackId as string} />,
    )
    .with(
      P.when((type) => isPdf({ mimeType: type })),
      () => <PdfViewer file={contentUrl as string} />,
    )
    .with(
      P.when((type) => isGlb({ mimeType: type })),
      () => <Model src={contentUrl as string} />,
    )
    .with(
      P.when((type) => isMarkdown({ mimeType: type })),
      () => <MarkdownRenderer contentUrl={contentUrl as string} />,
    )
    .otherwise(() => (
      <Stack className="h-full items-center justify-center">
        <Typography className="text-secondary-foreground">
          Unsupported content type
        </Typography>
      </Stack>
    ))

    const contentWrapperClass = match({ mimeType: contentType }) // Wrap the contentType string in an object
  .with(
    P.when(isMarkdown), 
    () => "bg-white"
  )
  .otherwise(() => "bg-[#F3F4F6]")

  return (
    <Stack className="h-[calc(100dvh-38px)] md:flex-row">
      <div className={`${contentWrapperClass} w-full h-full md:w-[78%]`}>
        {content}
      </div>
      <div className="md:w-[22%]">
        <ItemSidebar
          // @ts-ignore
          reference={reference}
          itemMetadata={itemMetadata}
        />
      </div>
    </Stack>
  )
}