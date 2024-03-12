import * as React from 'react'
import { cn } from '../utils'
import type { SvgProps } from './iconTypes'

export function X({ width = 10, stroke = 'black', className }: SvgProps) {
  return (
    <svg
      className={cn(className)}
      width={width}
      height={width}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        y1="-0.5"
        x2="12.6294"
        y2="-0.5"
        transform="matrix(0.70156 0.71261 -0.70156 0.71261 0 1)"
        stroke={stroke}
      />
      <line
        y1="-0.5"
        x2="12.6294"
        y2="-0.5"
        transform="matrix(0.70156 -0.71261 0.70156 0.71261 1.14062 10)"
        stroke={stroke}
      />
    </svg>
  )
}
