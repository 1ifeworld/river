import { Grid } from '@/design-system'
import { ChannelCard } from '@/server'
import { fetchAllChannels, type AllChannelsResponse } from '@/lib'

export default async function Home() {

  const { allChannels } = await fetchAllChannels()

  const { metadata } = await getChannelMetadata(allChannels.channels)

  return (
    <Grid className="grid-cols-1 md:grid-cols-[repeat(auto-fill,_minmax(272px,_1fr))] gap-2 pt-3">
      {allChannels.channels.map((channel, index: number) => (
        <ChannelCard key={index} channel={channel} metadata={metadata} />
      ))}
    </Grid>
  )
}

async function getChannelMetadata(channels: any) {
  // Extract URIs from the channels array
  const uris = channels.map((channel: { uri: any }) => channel.uri)
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
    return {
      metadata: metadata,
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return { metadata: null, error }
  }
}
