import { createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { river_j5bpjduqfv } from './customChainConfig'

const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`)

export const relayWalletClient = createWalletClient({ 
  account,
  chain: river_j5bpjduqfv,
  transport: http(process.env.RPC_URL)
})