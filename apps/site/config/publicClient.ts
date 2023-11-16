import { http, createPublicClient } from 'viem'
import { opGoerliViem } from '@/constants'

const transport = http(
  `https://opt-goerli.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
  {
    batch: true,
  },
)

export const publicClient = createPublicClient({
  chain: opGoerliViem,
  transport: transport,
})
