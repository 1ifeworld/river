import sdk from '../client'
import { channelSchema } from 'scrypt'

export async function getChannels() {
  const channels = await sdk.Channel()

  return {
    channels: channels,
  }
}
