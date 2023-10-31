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
          logo: 'https://bafybeif4qpiqpjhqx4urcn6alxwldtmsupj57zynpciitb2u55zjw6r57a.ipfs.nftstorage.link/river_logo_2x.svg',
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
