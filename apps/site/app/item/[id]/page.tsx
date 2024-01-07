import { AudioPlayer, ContentWrapper, VideoPlayer } from '@/client'
import { Stack } from '@/design-system'
import { getReferenceWithId } from '@/gql'
import {
  getChannelMetadata,
  getReferenceMetadata,
  ipfsUrlToCid,
  isAudio,
  isImage,
  isPdf,
  isVideo,
  pinataUrlFromCid,
} from '@/lib'
import { ChannelIndex, MobileItemStub } from '@/server'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import * as React from 'react'

const Model = dynamic(
  () => import('../../../components/client/renderers/ModelRenderer'),
  { ssr: false },
)

const MarkdownRenderer = dynamic(
  () => import('../../../components/client/renderers/MarkdownRenderer'),
  { ssr: false },
)

const PdfViewer = dynamic(
  () => import('../../../components/client/renderers/PDFViewer'),
  { ssr: false },
)

export default async function View({
  params,
}: {
  params: { itemId: string; id: string }
}) {
  // Top level getter for reference information
  const { reference } = await getReferenceWithId({
    id: params.id,
  })
  // Check if reference is valid
  if (!reference || !reference.channel) {
    return <div>Not a valid item</div>
  }
  // Fetch metadata for various downstream targets
  const { metadata: channelMetadata } = await getChannelMetadata([
    reference.channel,
  ])
  const { metadata: itemMetadata } = await getReferenceMetadata([reference])
  const { metadata: channelReferencesMetadata } = await getReferenceMetadata(
    reference.channel.references,
  )
  const referenceMetadata = itemMetadata.data[reference?.pubRef?.uri as string]
  // Extract content type from referenceMetadata
  const contentType = referenceMetadata.contentType
  // Initialize dynamic variable for setting contentUrl
  let contentUrl
  // Set contentUrl to appropriate route
  if (
    referenceMetadata.contentType === 'model/gltf-binary' ||
    referenceMetadata.contentType === 'application/pdf' ||
    referenceMetadata.contentType === 'text/markdown' ||
    isAudio({ mimeType: referenceMetadata.contentType })
  ) {
    const cid = ipfsUrlToCid({ ipfsUrl: referenceMetadata.animationUri })
    contentUrl = pinataUrlFromCid({ cid })
  } else {
    const cid = ipfsUrlToCid({ ipfsUrl: referenceMetadata.image })
    contentUrl = pinataUrlFromCid({ cid })
  }
  // Initialize dynamic variable for setting content
  let content
  // Set content to appropriate media player
  switch (true) {
    case isImage({ mimeType: contentType }):
      content = (
        <Image
          className="object-contain"
          src={contentUrl}
          alt={referenceMetadata.name}
          fill
          quality={100}
          priority={true}
        />
      )
      break
    case isVideo({ mimeType: contentType }):
      content = (
        <div className="flex w-full h-full">
          <VideoPlayer playbackId={referenceMetadata.muxPlaybackId} />
        </div>
      )
      break
    case isAudio({ mimeType: contentType }):
      content = <AudioPlayer playbackId={referenceMetadata.muxPlaybackId} />
      break
    case isPdf({ mimeType: contentType }):
      content = <PdfViewer file={contentUrl} />
      break
    case contentType === 'text/markdown':
      content = <MarkdownRenderer contentUrl={contentUrl} />
      break
    case contentType === 'model/gltf-binary':
      content = <Model src={contentUrl} />
      break
    default:
      content = <div>unsupported content type</div>
  }
  // Render page contents
  return (
    <div className=" flex flex-col md:flex-row md:h-[calc(100vh_-_56px)] md:max-h-[calc(100vh_-_56px)] md:justify-center pt-4">
      <Stack className="sticky top-0 hidden h-full  md:block md:w-[286px] md:pt-4">
        <ChannelIndex
          showTop={true}
          reference={reference}
          channel={reference.channel}
          referenceMetadata={referenceMetadata}
          channelMetadata={channelMetadata.data[reference.channel.uri]}
          channelRefsMetadata={channelReferencesMetadata}
        />
      </Stack>
      <Stack className="flex-grow md:overflow-auto w-full h-full gap-y-4 md:gap-y-0 md:justify-center">
        <ContentWrapper
          item={reference}
          className="w-full h-[480px] md:h-[calc(100vh/1.1)] md:max-w-[calc(100vw/1.2)] relative"
        >
          {content}
        </ContentWrapper>
        <MobileItemStub
          className="block md:hidden "
          reference={reference}
          referenceMetadata={referenceMetadata}
        />
        <Stack className="block md:hidden  py-8">
          <ChannelIndex
            showTop={false}
            reference={reference}
            channel={reference.channel}
            referenceMetadata={referenceMetadata}
            channelMetadata={channelMetadata.data[reference.channel.uri]}
            channelRefsMetadata={channelReferencesMetadata}
          />
        </Stack>
      </Stack>
    </div>
  )
}
