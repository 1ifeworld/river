import { type Address } from 'viem'
import sdk from '../client'
import { unstable_cache } from 'next/cache'

export const getUserId = unstable_cache(async ({
  custodyAddress,
}: { custodyAddress: Address }) => {
  if (!custodyAddress) {
    throw new Error('Address is required')
  }

  const response = await sdk.UserId({
    custodyAddress: custodyAddress as string,
  })

  return {
    userId: response.users?.items?.[0] ? response.users.items[0].userId : null,
  }
}, ["userId"])
