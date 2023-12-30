'use client'

import * as React from 'react'
import { PrivyProviderWrapper } from './PrivyProviderWrapper'
import { UserContextComponent } from '@/context'
import { ThemeProvider } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange>
      <PrivyProviderWrapper>
        <UserContextComponent>{children}</UserContextComponent>
      </PrivyProviderWrapper>
    </ThemeProvider>
  )
}
