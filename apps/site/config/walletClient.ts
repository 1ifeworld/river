import 'server-only'

import { http, createWalletClient, type Hash, createPublicClient } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { opGoerliViem } from '@/constants'

const transport = http(
  `https://optimism-goerli.infura.io/v3/${process.env.INFURA_KEY}`,
)

export const operator = privateKeyToAccount(process.env.PRIVATE_KEY as Hash)

export const walletClient = createWalletClient({
  account: operator,
  chain: opGoerliViem,
  transport: transport,
})

export const serverSidePublicClient = createPublicClient({
  chain: opGoerliViem,
  transport: transport,
})
