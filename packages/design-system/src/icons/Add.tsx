import * as React from 'react';
import { cn } from '../utils';
import { type SvgProps } from './types';

export function Add({ width = '15', fill, className }: SvgProps) {
  return (
    <svg
      width={width}
      height={width}
      viewBox='0 0 15 15'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={cn(className)}
    >
      <path
        d='M7.5 12.5V2.5M2.5 7.5H12.5'
        stroke={fill}
        stroke-width='1.66667'
        stroke-linecap='round'
      />
    </svg>
  );
}
