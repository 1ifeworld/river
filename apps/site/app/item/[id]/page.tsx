import * as React from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { Stack, Typography } from '@/design-system'
import { getReferenceWithId, type Reference } from '@/gql'
import {
  ipfsUrlToCid,
  pinataUrlFromCid,
  isVideo,
  isPdf,
  isAudio,
  isImage,
  isText
} from '@/lib'
import { ContentWrapper, VideoPlayer, AudioPlayer } from '@/client'
import { Username } from '@/server'
import { unixTimeConverter } from '@/utils'

const Model = dynamic(
  () => import('../../../components/client/renderers/ModelRenderer'),
  {
    ssr: false,
  },
)

const MarkdownRenderer = dynamic(
  () => import('../../../components/client/renderers/MarkdownRenderer'),
  {
    ssr: false,
  },
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
  const { reference } = await getReferenceWithId({
    id: params.id,
  })

  if (!reference) {
    return <div>Not a valid item</div>
  }

  const { metadata } = await getReferenceMetadata(reference as Reference)

  const referenceMetadata = metadata.data[reference?.pubRef?.uri as string]

  let contentUrl

  if (
    referenceMetadata.contentType === 'model/gltf-binary' ||
    referenceMetadata.contentType === 'application/pdf' ||
    referenceMetadata.contentType === 'text/markdown'  ||
    isAudio({ mimeType: referenceMetadata.contentType })
  ) {
    const cid = ipfsUrlToCid({ ipfsUrl: referenceMetadata.animationUri })
    contentUrl = pinataUrlFromCid({ cid })
  } else {
    const cid = ipfsUrlToCid({ ipfsUrl: referenceMetadata.image })
    contentUrl = pinataUrlFromCid({ cid })
  }

  const contentType = referenceMetadata.contentType
  let content

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
        <div className="w-[75%] sm:w-[50%]">
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
      content = <div>ji</div>
  }
  return (
    <Stack className="h-[calc(100vh_-_56px)] justify-center items-center">
      <ContentWrapper
        item={reference}
        className="w-full h-[calc(100vh/1.5)] justify-center items-center relative"
      >
        {content}
      </ContentWrapper>
      <Stack className="w-full items-center pt-2">
        <Typography>{referenceMetadata.name}</Typography>
        <Username id={reference.createdBy} />
        <Typography className="text-secondary-foreground">
          {unixTimeConverter(reference.createdTimestamp)}
        </Typography>
      </Stack>
    </Stack>
  )
}

async function getReferenceMetadata(reference: Reference) {
  // Extract URI from the reference
  const uri = reference.pubRef?.uri
  if (!uri) {
    return { metadata: null, error: 'No URI found in reference' }
  }
  // setup endpoint
  const getMetadataEndpoint = `${process.env.NEXT_PUBLIC_METADATA_SERVER_URL}/get`
  // Prepare the request body
  const body = JSON.stringify({ cids: [uri] })

  try {
    const response = await fetch(getMetadataEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const metadata = await response.json()
    return {
      metadata: metadata,
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return { metadata: null, error }
  }
}
