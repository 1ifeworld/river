'use client'

import * as React from 'react'
import { PrivyProviderWrapper, UsernameProvider } from '@/client'
import { UserContextComponent } from '@/context'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UsernameProvider>
      <PrivyProviderWrapper>
        <UserContextComponent>{children}</UserContextComponent>
      </PrivyProviderWrapper>
    </UsernameProvider>
  )
}
