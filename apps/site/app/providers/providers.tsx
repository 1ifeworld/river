'use client'

import * as React from 'react'
import { PrivyProviderWrapper, ThemeProvider } from './'
import { UserContextComponent } from '@/context'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <PrivyProviderWrapper>
        <UserContextComponent>{children}</UserContextComponent>
      </PrivyProviderWrapper>
    </ThemeProvider>
  )
}
