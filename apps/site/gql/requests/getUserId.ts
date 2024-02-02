import { type Address } from 'viem'
import sdk from '../client'

export async function getUserId({
  custodyAddress,
}: { custodyAddress: Address }) {
  if (!custodyAddress) {
    throw new Error('Address is required')
  }

  const response = await sdk.UserId({
    custodyAddress: custodyAddress as string,
  })

  return {
    userId: response.users?.items?.[0] ? response.users.items[0].userId : null
  }

  // return {
  //   userId: response?.users[0]?.userId as bigint,
  // }
}
