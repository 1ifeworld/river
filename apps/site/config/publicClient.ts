import { http, createPublicClient } from 'viem'
import { arbitrumNova } from './customChainConfig'

const transport = http(process.env.RPC_URL)

export const publicClient = createPublicClient({
  chain: arbitrumNova,
  transport: transport,
})
