import { Grid } from '@/design-system'
import { getAllChannels, type Channel } from '@/gql'
import { ChannelCard } from '@/server'

export default async function Home() {
  const { channels } = await getAllChannels()
  const { metadata } = await getChannelMetadata(channels)

  return (
    <Grid className="grid-cols-1 md:grid-cols-[repeat(auto-fill,_minmax(272px,_1fr))] gap-2 pt-3">
      {channels.map((channel: Channel, index: number) => (
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
