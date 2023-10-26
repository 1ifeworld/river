'use client'

import { PrivyProvider } from '@privy-io/react-auth'
import { ConnectKitProvider } from 'connectkit'
import * as React from 'react'
import { WagmiConfig } from 'wagmi'
import { config } from '../wagmiConfig'

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  return (
    <WagmiConfig config={config}>
      {/* <ConnectKitProvider> */}
      <PrivyProvider
        appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID as string}
        config={{
          appearance: {
            showWalletLoginFirst: false,
            logo: 'https://bafybeibjpp3pfnawvtmkqpemzhcsygj64ime7zngdpdd2evpzmvdespi7a.ipfs.nftstorage.link/river_logo.svg',
          },
          loginMethods: ['email'],
          embeddedWallets: {
            createOnLogin: 'users-without-wallets',
            requireUserPasswordOnCreate: false,
            noPromptOnSignature: true,
          },
        }}
      >
        {mounted && children}
      </PrivyProvider>
      {/* </ConnectKitProvider> */}
    </WagmiConfig>
  )
}
