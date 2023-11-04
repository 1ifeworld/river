import {
  http,
  createPublicClient,
  createWalletClient,
  PublicClient,
} from 'viem'
import { opGoerliViem, operator } from '@/constants'

export const publicClient = createPublicClient({
  chain: opGoerliViem,
  transport: http(
    'https://opt-goerli.g.alchemy.com/v2/JJwDRfj6qnjaoijYzde3Sk_k_U6IlTDn',
    // `https://opt-goerli.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
    // 'https://opt-goerli.g.alchemy.com/v2/demo',
  ),
}) as PublicClient

export const walletClient = createWalletClient({
  account: operator,
  chain: opGoerliViem,
  transport: http(),
})
