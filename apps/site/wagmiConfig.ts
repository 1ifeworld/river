import { configureChains } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { opGoerliViem } from './constants'

const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_KEY

export const configureChainsConfig = configureChains(
  [opGoerliViem],
  [alchemyProvider({ apiKey: alchemyKey as string }), publicProvider()],
)
