import { cache } from 'react'
import sdk from '../client'

export const getAllChannels = cache(async () => {
  const response = await sdk.allChannels()

  return {
    channels: response.channels,
  }
})
