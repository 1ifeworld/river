import sdk from '../client'
import { type Hash } from 'viem'

export async function getChannels({ schema }: { schema: Hash }) {
  const channels = await sdk.Nodes({ schema: schema as string })

  return {
    channels: channels.nodes,
  }
}
