import { http, createPublicClient } from 'viem'
import { arbitrumNova } from './customChainConfig'

const transport = http(process.env.NEXT_PUBLIC_NOVA_RPC_URL)

export const publicClient = createPublicClient({
  chain: arbitrumNova,
  transport: transport,
})
