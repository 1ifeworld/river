import { PropsWithChildren } from 'react'
import { cn } from '../utils/cn'

type GridProps = PropsWithChildren<{
  className?: string
}>

export function Grid(props: GridProps) {
  return <div className={cn('grid', props.className)}>{props.children}</div>
}

Grid.displayName = 'Grid'