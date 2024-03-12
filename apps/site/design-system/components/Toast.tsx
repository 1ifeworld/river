import { Flex, Typography } from '@/design-system'
import type { ReactNode } from 'react'

interface ToastProps {
  children: ReactNode
}

export function Toast({ children }: ToastProps) {
  return (
    <Flex className="bg-background border-[0.5px] px-4 py-2">
      <Typography className="font-mono">{children}</Typography>
    </Flex>
  )
}
