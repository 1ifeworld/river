import sdk from '../client'
import { unstable_cache } from 'next/cache'

export const getChannelsItemsWithUser = unstable_cache(async ({ userId }: { userId: string }) => {
  const response = await sdk.channelsItemsWithUser({
    userId: BigInt(userId),
  })

  return { channels: response.channels, items: response.items }
}, ["channelsItemsWithUser"])
