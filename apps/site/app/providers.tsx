'use client'

import * as React from 'react'
import { ConnectKitProvider } from 'connectkit'
import { WagmiConfig } from 'wagmi'
import { config } from '../wagmiConfig'

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider>{mounted && children}</ConnectKitProvider>
    </WagmiConfig>
  )
}
