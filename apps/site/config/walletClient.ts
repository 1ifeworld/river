import 'server-only'

import { http, createWalletClient, type Hash, publicActions } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { opGoerliViem } from '@/constants'

const transport = http(
  `https://opt-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`,
  {
    batch: true,
  },
)

export const operator = privateKeyToAccount(process.env.PRIVATE_KEY as Hash)

export const walletClient = createWalletClient({
  account: operator,
  chain: opGoerliViem,
  transport: transport,
})

// .extend(publicActions)