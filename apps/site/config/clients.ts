import {
  http,
  createPublicClient,
  createWalletClient,
  PublicClient,
} from 'viem'
import { opGoerliViem, operator } from '@/constants'

const transport = http(
  `https://opt-goerli.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
  {
    batch: true,
  },
)

export const publicClient = createPublicClient({
  chain: opGoerliViem,
  transport: transport,
}) as PublicClient

export const walletClient = createWalletClient({
  account: operator,
  chain: opGoerliViem,
  transport: transport,
})
