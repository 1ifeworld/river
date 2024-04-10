import sdk from '../client'
import { unstable_cache } from 'next/cache'

export const getMarqueeData = unstable_cache(async () => {
  const response = await sdk.marqueeData()

  return {
    data: response.addss?.items,
  }
}, ['marqueeData'])
