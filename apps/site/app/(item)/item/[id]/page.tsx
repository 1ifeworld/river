import { AudioPlayer, VideoPlayer } from '@/client'
import { ItemSidebar } from '@/server'
import { Typography, Flex } from '@/design-system'
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
  pinataUrlFromCid,
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

  if (!reference || !reference.channel) {
    return <Typography>Not a valid item</Typography>
  }

  const itemMetadata = await kv.get<Pick<MediaAssetObject, 'value'>['value']>(
    reference?.pubRef?.uri as string,
  )

  const contentType = itemMetadata?.contentType as string

  console.log('Content type:', contentType)

  let contentUrl: string | undefined

  if (
    itemMetadata?.contentType === 'model/gltf-binary' ||
    itemMetadata?.contentType === 'application/pdf' ||
    itemMetadata?.contentType === 'text/markdown' ||
    isAudio({ mimeType: itemMetadata?.contentType as string })
  ) {
    const cid = ipfsUrlToCid({ ipfsUrl: itemMetadata?.animationUri as string })
    contentUrl = pinataUrlFromCid({ cid })
  } else {
    const cid = ipfsUrlToCid({ ipfsUrl: itemMetadata?.image as string })
    contentUrl = pinataUrlFromCid({ cid })
  }

  console.log('Content url:', contentUrl)

  const content = match(contentType)
    .with(
      P.when((type) => isImage({ mimeType: type })),
      () => (
        <div className="relative h-full">
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
      () => <VideoPlayer playbackId={itemMetadata?.muxPlaybackId as string} />,
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
    .otherwise(() => <Typography>Unsupported content type</Typography>)

  return (
    <Flex>
      <div className="bg-[#F3F4F6] w-full md:w-[78%]">{content}</div>
      <div className="hidden md:w-[22%] md:block">
        <ItemSidebar
          contentUrl={contentUrl}
          reference={reference}
          itemMetadata={itemMetadata}
        />
      </div>
    </Flex>
  )
}

// <div className="pt-4 md:pt-[70px] flex flex-col md:flex-row md:h-[calc(100vh_-_56px)] md:max-h-[calc(100vh_-_56px)] md:justify-center">
//   <Stack className="sticky top-0 hidden h-full  md:block md:w-[286px] md:pt-4">
//     <ChannelIndex
//       showTop={true}
//       reference={reference}
//       channel={reference.channel}
//       referenceMetadata={referenceMetadata}
//       channelMetadata={channelMetadata.data[reference.channel.uri]}
//       channelRefsMetadata={channelReferencesMetadata}
//     />
//   </Stack>
//   <Stack className="flex-grow md:overflow-auto w-full h-full gap-y-4 md:gap-y-0 md:justify-center">
//     <ContentWrapper
//       item={reference}
//       className="w-full h-[480px] md:h-[calc(100vh/1.1)] md:max-w-[calc(100vw/1.2)] relative"
//     >
//       {content}
//     </ContentWrapper>
//     <MobileItemStub
//       className="block md:hidden"
//       reference={reference}
//       referenceMetadata={referenceMetadata}
//     />
//     <Stack className="block md:hidden py-8">
//       <ChannelIndex
//         showTop={false}
//         reference={reference}
//         channel={reference.channel}
//         referenceMetadata={referenceMetadata}
//         channelMetadata={channelMetadata.data[reference.channel.uri]}
//         channelRefsMetadata={channelReferencesMetadata}
//       />
//     </Stack>
//   </Stack>
// </div>
