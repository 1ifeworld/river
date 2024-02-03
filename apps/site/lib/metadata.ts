import { type Channel, type Adds } from '@/gql'

export interface ChannelMetadata {
  name: string
  description: string
  image?: string
  animationUri?: string
  contentType: string
}

export async function getChannelMetadata(channels: Channel[]) {
  // Extract URIs from the channels array
  const uris = channels.map((channel: { uri: string }) => channel.uri)
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

export async function getAddsMetadata(manyAdds: Adds[]) {
  // const { items } = manyAdds
  // console.log("wahts getting pasesed to get Adds", manyAdds)
  // console.log("the one that works", manyAdds[5])
  // Extract URIs from the references array
  const uris = manyAdds
    // .map((add) => add?.item?.uri)
    .map((add) => add.item?.uri)
    .filter((uri: string | undefined) => uri != null)
  console.log('uris: ', uris)
  // Setup endpoint
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
