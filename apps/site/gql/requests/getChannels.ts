import sdk from '../client'

export async function getChannels() {
  const channels = await sdk.Channel()

  return {
    channels: channels,
  }
}
