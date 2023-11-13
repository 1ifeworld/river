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
    `https://opt-goerli.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
  ),
}) as PublicClient

export const walletClient = createWalletClient({
  account: operator,
  chain: opGoerliViem,
  transport: http(
    `https://opt-goerli.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
  ),
})
