import sdk from '../client'
import { unstable_cache } from 'next/cache'

export const getChannelWithId = unstable_cache(
  async ({
    id,
    limit,
    after,
  }: { id: string; limit: number; after?: string }) => {
    const response = await sdk.channelWithId({
      id,
      limit,
      after,
    })

    return {
      channel: response.channel,
      pageInfo: response.channel?.adds?.pageInfo,
    }
  },
  ['channelWithId'],
)
