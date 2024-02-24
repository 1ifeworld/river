import sdk from '../client'
import { unstable_cache } from 'next/cache'

export const getAllItems = unstable_cache(async () => {
  const response = await sdk.allItems()

  return {
    items: response.items,
  }
}, ['allItems'])
