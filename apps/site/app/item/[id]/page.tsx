import { Stack } from 'design-system/elements'
import { getReferenceWithId, type Reference } from '@/gql'
import { ipfsUrlToCid, pinataUrlFromCid, isVideo } from '@/lib'
import Image from 'next/image'
import { VideoPlayer } from '@/client'
import React, { useRef, useState } from 'react'
import dynamic from 'next/dynamic'

const Model = dynamic(() => import('../../../components/client/renderer/glb/Model'), {
  ssr: false,
})

export default async function View({
  params,
}: {
  params: { itemId: string; id: string }
}) {
  const { reference } = await getReferenceWithId({
    id: params.id,
  })

  const { metadata } = await getReferenceMetadata(reference as Reference)

  const referenceMetadata = metadata.data[reference?.pubRef?.uri as string]
  let contentUrl
  if (referenceMetadata.contentType === 'model/gltf-binary') {
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
  } else if (contentType === 'model/gltf-binary') {
    return (
      <Stack className="w-full h-[calc(100vh_-_56px)] justify-center items-center">
        <Model src={contentUrl} />
      </Stack>
    )
  } else {
    return (
      <Stack className="w-full h-[calc(100vh_-_56px)] justify-center items-center overflow-hidden relative">
        <Image
          className="object-contain"
          src={contentUrl}
          alt={referenceMetadata.name}
          fill
          quality={100}
          priority={true}
        />
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
