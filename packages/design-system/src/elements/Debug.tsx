import { PropsWithChildren } from 'react'
import { cn } from '../utils/cn'

type DebugProps = PropsWithChildren<{
  className?: string
}>

export function Debug(props: DebugProps) {
  return <div className={cn('border border-red-500', props.className)}>{props.children}</div>
}

Debug.displayName = 'Debug'