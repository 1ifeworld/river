'use client'

import { PrivyProviderWrapper } from '@/client'
import * as React from 'react'
import { PrivyWagmiConnector } from '@privy-io/wagmi-connector'
import { configureChainsConfig } from '../wagmiConfig'

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  return (
    <PrivyProviderWrapper>
      <PrivyWagmiConnector wagmiChainsConfig={configureChainsConfig}>
        {/* <ConnectKitProvider> */}
        {mounted && children}
        {/* </ConnectKitProvider> */}
      </PrivyWagmiConnector>
    </PrivyProviderWrapper>
  )
}
