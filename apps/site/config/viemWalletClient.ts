import 'server-only'

import { createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { river_dev_2_d5hb5orqim } from './customChainConfig'

const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`)

export const relayWalletClient = createWalletClient({
  account,
  chain: river_dev_2_d5hb5orqim,
  transport: http(process.env.RPC_URL),
})
