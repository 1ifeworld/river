import { type Hex } from 'viem'
import { BasementSDK } from '@basementdev/sdk'
import { shortenAddress } from './shortenAddress'
import { isAddress } from 'viem'
import { env } from '../services/env'


export async function getAddressData(
  input: Hex | string,
): Promise<{ address: string; name: string }> {
  console.log('Input to getAddressDisplay:', input)

  const sdk = new BasementSDK({
    apiKey: env.NEXT_PUBLIC_BASEMENT_API,
    endpoint: 'https://beta.basement.dev/v2/graphql',
  })

  const data = await sdk.address({
    address: input,
    include: { reverseProfile: true, profile: true },
  })

  console.log('Data received from sdk.address:', data)

  if (data?.reverseProfile?.name) {
    console.log('Found reverse profile name:', data.reverseProfile.name)
    return {
      address: data.address,
      name: data.reverseProfile.name,
    }
  }

  if (data?.profile?.name && data?.address) {
    console.log(
      'Found profile name (Ethereum address for ENS):',
      data.profile.name,
    )
    return {
      address: data.address,
      name: data.profile.name,
    }
  }

  if (isAddress(input)) {
    console.log('Input is a valid Ethereum address:', input)
    return {
      address: input,
      name: shortenAddress(input),
    }
  }

  console.warn('Neither a valid Ethereum address nor a valid ENS name:', input)
  throw new Error('Invalid input provided.')
}
