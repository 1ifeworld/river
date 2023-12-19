import * as React from 'react'
import { PrivyProvider } from '@privy-io/react-auth'
import { river_j5bpjduqfv } from '@/config/customChainConfig'

export function PrivyProviderWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID as string}
      config={{
        appearance: {
          showWalletLoginFirst: false,
          theme: 'light',
        },
        loginMethods: ['email'],
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
          requireUserPasswordOnCreate: false,
          noPromptOnSignature: true,
        },
        defaultChain: river_j5bpjduqfv,
        supportedChains: [river_j5bpjduqfv],
      }}
    >
      {children}
    </PrivyProvider>
  )
}
