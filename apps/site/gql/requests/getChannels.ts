import sdk from '../client'

export async function getChannels() {
  const channels = await sdk.allChannels()

  return {
    channels: channels.channels,
  }
}
