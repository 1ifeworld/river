import sdk from '../client'
import { type Address } from 'viem'

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
    userId: response?.users[0]?.userId as bigint,
  }
}
