import { addresses } from '../../constants'
import { optimism, optimismSepolia } from 'viem/chains'

export const ID_REGISTRY_EIP_712_DOMAIN = {
  name: 'River IdRegistry',
  version: '1',
  chainId: optimismSepolia.id,
  verifyingContract: addresses.idRegistry.optimism,
} as const

export const REGISTER_TYPE = [
  { name: 'to', type: 'address' },
  { name: 'recovery', type: 'address' },
  { name: 'nonce', type: 'uint256' },
  { name: 'deadline', type: 'uint256' },
] as const
