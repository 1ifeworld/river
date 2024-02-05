import { http, createPublicClient } from 'viem'
import { arbitrumNova } from './customChainConfig'
import { optimism } from 'viem/chains'


export const optimismPubClient = createPublicClient({
  chain: optimism,
  transport: http(process.env.NEXT_PUBLIC_OPTIMISM_RPC_URL),
})

export const novaPubClient = createPublicClient({
  chain: arbitrumNova,
  transport: http(process.env.NEXT_PUBLIC_NOVA_RPC_URL),
})
