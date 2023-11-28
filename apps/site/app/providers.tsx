'use client'

import * as React from 'react'
import { PrivyProviderWrapper } from '@/client'
import { AlchemyProviderComponent } from '@/context'

export function Providers({ children }: { children: React.ReactNode }) {
  // const [mounted, setMounted] = React.useState(false)
  // React.useEffect(() => setMounted(true), [])
  return (
    <PrivyProviderWrapper>
      <AlchemyProviderComponent>{children}</AlchemyProviderComponent>
    </PrivyProviderWrapper>
  )
}
