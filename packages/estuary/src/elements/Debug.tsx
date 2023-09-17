import { PropsWithChildren } from 'react'
import { cn } from '../utils/cn'

type DebugProps = PropsWithChildren<{
  className?: string
}>

export function Debug(props: DebugProps) {
  return <div className={cn('border border-[#39FF14]', props.className)}>{props.children}</div>
}

Debug.displayName = 'Debug'