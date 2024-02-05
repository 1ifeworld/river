import { PrivyProvider } from '@privy-io/react-auth'
import { arbitrumNova } from '@/config/customChainConfig'

import * as React from 'react'

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
        defaultChain: arbitrumNova,
        supportedChains: [arbitrumNova],
      }}
    >
      {children}
    </PrivyProvider>
  )
}
