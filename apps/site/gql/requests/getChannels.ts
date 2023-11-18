import sdk from '../client'

export async function getChannels() {
  const response = await sdk.allChannels()

  return {
    channels: response.channels,
  }
}
