import sdk from '../client'
import { unstable_cache } from 'next/cache'

export const getChannelWithId = unstable_cache(
  async ({ id }: { id: string }) => {
    const response = await sdk.channelWithId({
      id: id,
    })

    return { channel: response.channel, bro: "haha" }
  },
  ['channelWithId'],
)
