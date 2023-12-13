import { Stack } from 'design-system/elements'
import { getChannelWithId, type Item } from '@/gql'
import { ipfsUrlToCid, pinataUrlFromCid, isVideo } from '@/lib'
import Image from 'next/image'
import { VideoPlayer } from '@/client'

export default async function View({
  params,
}: {
  params: { itemId: string; id: string }
}) {
  const { channel } = await getChannelWithId({
    id: params.id,
  })

  const item = channel?.items.find((item) => item.id === params.itemId)

  const { metadata } = await getItemMetadata(item as Item)

  const itemMetadata = metadata.data[item?.target?.publication?.uri as string]
  const cid = ipfsUrlToCid({ ipfsUrl: itemMetadata.image })
  const contentUrl = pinataUrlFromCid({ cid })

  const contentType = itemMetadata.contentType

  if (isVideo({ mimeType: contentType })) {
    return (
      <Stack className="w-full h-[calc(100vh_-_56px)] justify-center items-center ">
        <Stack className="w-[75%] sm:w-[50%]">
          <VideoPlayer playbackId={itemMetadata.muxPlaybackId} />
        </Stack>
      </Stack>
    )
  } else {
    return (
      <Stack className="w-full h-[calc(100vh_-_56px)] justify-center items-center overflow-hidden relative">
        <Image
          className="object-contain"
          src={contentUrl}
          alt={metadata.name}
          fill
          quality={100}
          priority={true}
        />
      </Stack>
    )
  }
}

async function getItemMetadata(item: Item) {
  // Extract URI from the item
  const uri = item.target?.publication?.uri
  if (!uri) {
    return { metadata: null, error: 'No URI found in item' }
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
