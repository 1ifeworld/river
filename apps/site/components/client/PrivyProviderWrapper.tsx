import * as React from 'react'
import { PrivyProvider } from '@privy-io/react-auth'
import { opGoerliViem } from '@/constants'

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
          logo: 'https://bafybeibjpp3pfnawvtmkqpemzhcsygj64ime7zngdpdd2evpzmvdespi7a.ipfs.nftstorage.link/river_logo.svg',
        },
        loginMethods: ['email'],
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
          requireUserPasswordOnCreate: false,
          noPromptOnSignature: true,
        },
        defaultChain: opGoerliViem,
      }}
    >
      {children}
    </PrivyProvider>
  )
}
