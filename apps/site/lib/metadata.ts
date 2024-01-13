import { type Channel, type Reference } from '@/gql'

// This type is currently unused
export interface ChannelMetadata {
  metadata?: {
    name: string
    description: string
    image: string
    animationUri?: string
    contentType: string
  } | null
  error?: unknown
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

export async function getReferenceMetadata(references: Reference[]) {
  // Extract URIs from the references array
  const uris = references
    .map((reference) => reference.pubRef?.uri)
    .filter((uri: string | undefined) => uri != null)
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
