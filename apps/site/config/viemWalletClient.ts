import 'server-only'

import { createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { river_j5bpjduqfv } from './customChainConfig'

// const transport = http(process.env.RPC_URL)
// const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`)

// console.log("account.address: ", account.address)
// console.log("transport: ", transport)

export const relayWalletClient = createWalletClient({ 
  account: privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`),
  chain: river_j5bpjduqfv,
  transport: http()
})

// const hash = await client.sendTransaction({
//   to: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
//   value: parseEther('0.001')
// })