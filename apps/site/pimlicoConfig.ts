import {
  pimlicoBundlerActions,
  pimlicoPaymasterActions,
} from 'permissionless/actions/pimlico'
import { bundlerActions } from 'permissionless'
import { optimismGoerli } from 'viem/chains'
import { http, createClient } from 'viem'

const chain = 'optimism-goerli'

export const pimlicoBundlerClient = createClient({
  chain: optimismGoerli,
  // ⚠️ using v1 of the API ⚠️
  transport: http(
    `https://api.pimlico.io/v1/${chain}/rpc?apikey=${process.env.NEXT_PUBLIC_PIMLICO_KEY}`,
  ),
})
  .extend(bundlerActions)
  .extend(pimlicoBundlerActions)

export const pimlicoPaymasterClient = createClient({
  chain: optimismGoerli,
  // ⚠️ using v2 of the API ⚠️
  transport: http(
    `https://api.pimlico.io/v2/${chain}/rpc?apikey=${process.env.NEXT_PUBLIC_PIMLICO_KEY}`,
  ),
}).extend(pimlicoPaymasterActions)
