import sdk from '../client'
import { unstable_cache } from 'next/cache'

export const getAllChannels = unstable_cache(async () => {
  const response = await sdk.allChannels()

  return {
    channels: response.channels,
  }
}, ['allChannels'])
