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
    // `https://opt-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`,
    'https://opt-goerli.g.alchemy.com/v2/kGtQE8hvoBxj-ES55ZD8veLiqbyKLdE3',
  ),
}) as PublicClient

export const walletClient = createWalletClient({
  account: operator,
  chain: opGoerliViem,
  transport: http(
    // `https://opt-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`,
    'https://opt-goerli.g.alchemy.com/v2/kGtQE8hvoBxj-ES55ZD8veLiqbyKLdE3',
  ),
})
