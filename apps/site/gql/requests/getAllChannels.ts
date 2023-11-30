import sdk from '../client'

export async function getAllChannels() {
  const response = await sdk.allChannels()

  return {
    channels: response.channels
  }
}
