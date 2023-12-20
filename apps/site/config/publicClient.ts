import { http, createPublicClient } from 'viem'
import { river_j5bpjduqfv } from './customChainConfig'

const transport = http(process.env.RPC_URL)

export const publicClient = createPublicClient({
  chain: river_j5bpjduqfv,
  transport: transport,
})

// const transport = http(
//   `https://opt-goerli.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
// )

// export const publicClient = createPublicClient({
//   chain: opGoerliViem,
//   transport: transport,
// })
