import { PropsWithChildren } from 'react'
import { cn } from '../utils/cn'

type FlexProps = PropsWithChildren<{
  className?: string
}>

export function Flex(props: FlexProps) {
  return <div className={cn('flex', props.className)}>{props.children}</div>
}

Flex.displayName = 'Flex'
