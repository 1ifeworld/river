import sdk from '../client'

export async function getAllChannels() {
  const { channels } = await sdk.allChannels()

  return {
    channels,
  }
}
