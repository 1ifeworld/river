import { getDefaultConfig } from 'connectkit'
import { type Config, createConfig } from 'wagmi'
import { optimism, optimismGoerli } from 'wagmi/chains'

const chains = [optimismGoerli]

export const config: Config = createConfig(
  getDefaultConfig({
    appName: 'River',
    alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_KEY,
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID as string,
    autoConnect: true,
    chains,
  }),
)
