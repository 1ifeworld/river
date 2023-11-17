import { Flex, Typography } from '@/design-system'
import { ReactNode } from 'react'

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

// interface ToastProps {
//   toastText: string
// }

// export function Toast({ toastText }: ToastProps) {
//   return (
//     <Flex className="bg-background border-[0.5px] border-secondary-foreground px-4 py-2 text-base font-mono">
//       <Typography>{toastText}</Typography>
//     </Flex>
//   )
// }
