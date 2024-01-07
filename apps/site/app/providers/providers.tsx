'use client'

import { UserContextComponent } from '@/context'
import { ThemeProvider } from 'next-themes'
import * as React from 'react'
import { PrivyProviderWrapper } from './PrivyProviderWrapper'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      disableTransitionOnChange
      defaultTheme="light"
    >
      <PrivyProviderWrapper>
        <UserContextComponent>{children}</UserContextComponent>
      </PrivyProviderWrapper>
    </ThemeProvider>
  )
}
