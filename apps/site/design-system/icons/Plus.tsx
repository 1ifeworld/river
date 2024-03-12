import * as React from 'react'
import { cn } from '../utils'
import type { SvgProps } from './iconTypes'

export function Plus({
  width = 15,
  fill = '#000000',
  stroke = 'black',
  className,
}: SvgProps) {
  return (
    <svg
      className={cn(className)}
      width={width}
      height={width}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="7.24707"
        cy="7.24707"
        r="6.61295"
        stroke={stroke}
        stroke-width="1.26824"
      />
      <line
        x1="4.02148"
        y1="7.20125"
        x2="10.4339"
        y2="7.20125"
        stroke={stroke}
        stroke-width="1.27231"
      />
      <line
        x1="7.25334"
        y1="4.02051"
        x2="7.25334"
        y2="10.3821"
        stroke={stroke}
        stroke-width="1.27231"
      />
    </svg>
  )
}
