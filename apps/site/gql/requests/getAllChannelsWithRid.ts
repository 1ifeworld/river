import sdk from '../client'
import { unstable_cache } from 'next/cache'

export const getAllChannelsWithRid =
  // unstable_cache(
  async ({ userId }: { userId: bigint }) => {
    const response = await sdk.allChannelsWithRid({
      rid: BigInt(userId),
    })

    return {
      channels: response?.channelRoless,
    }
  }
//   ['allChannelsWithRid'],
// )
