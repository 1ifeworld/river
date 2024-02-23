import sdk from '../client'
import { unstable_cache } from 'next/cache'

export const getItemWithId = unstable_cache(async ({ id }: { id: string }) => {
  const response = await sdk.itemWithId({
    id: id,
  })

  return { item: response.item }
}, ["itemWithId"])
