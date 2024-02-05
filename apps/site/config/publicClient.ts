import { http, createPublicClient } from 'viem'
import { arbitrumNova } from './customChainConfig'

const transport = http(process.env.NOVA_RPC_URL)

export const publicClient = createPublicClient({
  chain: arbitrumNova,
  transport: transport,
})
