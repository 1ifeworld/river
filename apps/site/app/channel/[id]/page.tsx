import { getChannelWithId, type Reference } from '@/gql'
import { Stack } from '@/design-system'
import { ChannelBanner } from '@/server'
import { BannerWrapper, ItemsWrapper } from '@/client'

export default async function Channel({
  params,
}: {
  params: { id: string }
}) {
  const { channel } = await getChannelWithId({
    id: params.id,
  })

  if (!channel) {
    return (
      <Stack className="pt-[72px] gap-14">This is not a valid channel :/</Stack>
    )
  }

  const { channelMetadata } = await getChannelMetadata(channel)
  const { metadata } = await getReferencesMetadata(channel?.references)

  return (
    <Stack className="pt-4 gap-4 h-full">
      <BannerWrapper channel={channel} metadata={channelMetadata} />
      <ItemsWrapper channel={channel} metadata={metadata} />
    </Stack>
  )
}

async function getReferencesMetadata(references: any) {
  // Extract URIs from the channels array
  const uris = references
    .map((reference: { pubRef: any }) => reference.pubRef.uri)
    .filter((uri: string | undefined) => uri != null)
  // setup endpoint
  const getMetadataEndpoint = `${process.env.NEXT_PUBLIC_METADATA_SERVER_URL}/get`
  // Prepare the request body
  const body = JSON.stringify({ cids: uris })

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
    console.log(metadata)
    return {
      metadata: metadata,
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return { metadata: null, error }
  }
}

async function getChannelMetadata(channel: any) {
  // Extract URIs from the channels array
  const uri = [channel.uri]
  // setup endpoint
  const getMetadataEndpoint = `${process.env.NEXT_PUBLIC_METADATA_SERVER_URL}/get`
  // Prepare the request body
  const body = JSON.stringify({ cids: uri })

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
      channelMetadata: metadata,
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return { channelMetadata: null, error }
  }
}
