import sdk from '../client'
import { channelSchema } from 'scrypt'

export async function getChannels() {
  const channels = await sdk.Nodes({ schema: channelSchema })

  return {
    channels: channels.nodes,
  }
}
