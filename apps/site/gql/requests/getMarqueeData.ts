import sdk from '../client'
import { unstable_cache } from 'next/cache'

export const getMarqueeData = unstable_cache(async () => {
  const response = await sdk.marqueeData()

  return {
    users: response.userCounters,
    channels: response.channelCounters,
    items: response.itemCounters,
  }
}, ["marqueeData"])
