import sdk from '../client'

export const getAllChannels = (async () => {
  const response = await sdk.allChannels()

  return {
    channels: response.channels,
  }
})
