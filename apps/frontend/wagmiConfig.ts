import { getDefaultConfig } from 'connectkit'
import { type Config, createConfig } from 'wagmi'
import { optimism, optimismGoerli, zora, zoraTestnet } from 'wagmi/chains'
import { env } from './services/env'

const chains = [optimismGoerli]

export const config: Config = createConfig(
  getDefaultConfig({
    appName: 'River',
    alchemyId: env.NEXT_PUBLIC_ALCHEMY_KEY,
    walletConnectProjectId: env.NEXT_PUBLIC_WALLET_CONNECT_ID,
    autoConnect: true,
    chains,
  }),
)
