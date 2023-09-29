import { type Hex } from 'viem'
import { BasementSDK } from '@basementdev/sdk'
import { shortenAddress } from './shortenAddress'
import { env } from '../services/env'

export async function getAddressDisplay(address: Hex) {
  const sdk = new BasementSDK({
    apiKey: env.NEXT_PUBLIC_BASEMENT_API,
    endpoint: 'https://beta.basement.dev/v2/graphql',
  })

  try {
    const data = await sdk.address({
      address: address,
      include: { reverseProfile: true },
    })

    const display = data?.reverseProfile?.name || shortenAddress(address)

    return {
      display,
    }
  } catch (error) {
    console.error(
      'Failed to get address display for address:',
      address,
      'Error:',
      error,
    )
    return {
      display: shortenAddress(address),
    }
  }
}
