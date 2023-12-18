import React, { useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { Stack, Typography } from '@/design-system'
import { getReferenceWithId, type Reference } from '@/gql'
import { ipfsUrlToCid, pinataUrlFromCid, isVideo, isPdf, isAudio } from '@/lib'
import { ContentWrapper, VideoPlayer, AudioPlayer } from '@/client'
import { Username } from '@/server'
import { unixTimeConverter } from 'utils/unixTimeConverter'

const Model = dynamic(
  () => import('../../../components/client/renderers/ModelRenderer'),
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
    isAudio({ mimeType: referenceMetadata.contentType })
  ) {
    const cid = ipfsUrlToCid({ ipfsUrl: referenceMetadata.animationUri })
    contentUrl = pinataUrlFromCid({ cid })
  } else {
    const cid = ipfsUrlToCid({ ipfsUrl: referenceMetadata.image })
    contentUrl = pinataUrlFromCid({ cid })
  }

  const contentType = referenceMetadata.contentType

  if (isVideo({ mimeType: contentType })) {
    return (
      <Stack className="w-full h-[calc(100vh_-_56px)] justify-center items-center ">
        <Stack className="w-[75%] sm:w-[50%]">
          <VideoPlayer playbackId={referenceMetadata.muxPlaybackId} />
        </Stack>
      </Stack>
    )
  } else if (isAudio({ mimeType: contentType })) {
    return (
      <Stack className="w-full h-[calc(100vh-_56px)] justify-center items-center ">
        <AudioPlayer playbackId={referenceMetadata.muxPlaybackId} />
      </Stack>
    )
  } else if (isPdf({ mimeType: contentType })) {
    return (
      <Stack className="w-full h-[calc(100vh_-_56px)] justify-center items-center ">
        <PdfViewer file={contentUrl} />
      </Stack>
    )
  } else if (contentType === 'model/gltf-binary') {
    return (
      <Stack className="w-full h-[calc(100vh_-_56px)] justify-center items-center">
        <Model src={contentUrl} />
      </Stack>
    )
  } else {
    return (
      <Stack>
        <ContentWrapper
          item={reference}
          className="w-full h-[calc(100vh/2)] sm:h-[calc(100vh/1.5)] justify-center items-center relative "
        >
          <Image
            className="object-contain"
            src={contentUrl}
            alt={referenceMetadata.name}
            fill
            quality={100}
            priority={true}
          />
        </ContentWrapper>
        <Stack className="w-full items-center">
          <Typography>{referenceMetadata.name}</Typography>
          <Username id={reference.createdBy} />
          <Typography>
            {unixTimeConverter(reference.createdTimestamp)}
          </Typography>
        </Stack>
      </Stack>
    )
  }
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
