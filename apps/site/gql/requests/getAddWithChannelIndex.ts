import sdk from '../client'
import { unstable_cache } from 'next/cache'
import { getAllAddsWithChannel } from '@/gql'

export const getAddWithChannelIndex = unstable_cache(
  async ({
    channelId,
    channelIndex,
  }: { channelId: string; channelIndex: bigint }) => {
    const channelIndexResponse = await sdk.addWithChannelIndex({
      channelId: channelId,
      channelIndex: channelIndex,
    })
    const { adds } = await getAllAddsWithChannel({ channelId: channelId })
    const mergedResponse = { ...channelIndexResponse.addss.items?.[0], adds }

    return { add: mergedResponse }
  },
  ['itemWithId'],
)
