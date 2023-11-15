'use client'

import { PrivyProviderWrapper } from '@/client'
import * as React from 'react'
import { PrivyWagmiConnector } from '@privy-io/wagmi-connector'
import { configureChainsConfig } from '../wagmiConfig'
import { AlchemyProviderComponent } from '@/context'

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  return (
    <PrivyProviderWrapper>
      {/* <PrivyWagmiConnector wagmiChainsConfig={configureChainsConfig}> */}
      {/* <ConnectKitProvider> */}
      <AlchemyProviderComponent>{mounted && children}</AlchemyProviderComponent>
      {/* </ConnectKitProvider> */}
      {/* </PrivyWagmiConnector> */}
    </PrivyProviderWrapper>
  )
}
