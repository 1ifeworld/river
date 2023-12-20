'use client'

import * as React from 'react'
import { PrivyProviderWrapper } from './'
import { UserContextComponent } from '@/context'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProviderWrapper>
      <UserContextComponent>{children}</UserContextComponent>
    </PrivyProviderWrapper>
  )
}
