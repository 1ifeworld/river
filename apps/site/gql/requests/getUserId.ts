import sdk from '../client'
import { Hex } from 'viem'

export async function getUserId({ custodyAddress }: { custodyAddress: Hex }) {
  try {
    // Make sure the address is provided
    if (!custodyAddress) {
      throw new Error('Address is required')
    }

    const response = await sdk.getUserId()

    const userId = response.idRegistrys[0].userId

    return userId ? { userId } : null
  } catch (error) {
    console.error('Error fetching user ID:', error)
    throw error
  }
}
