import { Channel } from '@/gql'
import sdk from '../client'

export async function getChannel({ hashId }: { hashId: string }) {
  // Perform the query
  const response = await sdk.ChannelWithHash({
    hashId: hashId,
  })

  // Access the first (and presumably only) channel in the response
  const channel = response.channels[0]

  return { channel }
}
