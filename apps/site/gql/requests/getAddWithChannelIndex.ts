import sdk from '../client'
import { unstable_cache } from 'next/cache'

export const getAddWithChannelIndex = unstable_cache(
  async ({
    channelId,
    channelIndex,
  }: { channelId: string; channelIndex: bigint }) => {
    const response = await sdk.addWithChannelIndex({
      channelId: channelId,
      channelIndex: channelIndex,
    })

    return { add: response.addss.items?.[0] }
  },
  ['itemWithId'],
)
