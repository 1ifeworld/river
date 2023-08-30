import * as React from 'react';
import { cn } from '../utils';
import { type SvgProps } from './types';

export function Exit({ width = '15', fill, className }: SvgProps) {
  return (
    <svg
      width={width}
      height={width}
      viewBox='0 0 23 23'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={cn(className)}
    >
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M7.96447 15.0355L15.0355 7.96446M7.96447 7.96446L15.0355 15.0355'
        // stroke={fill}
        stroke-width='1.66667'
        stroke-linecap='round'
      />
    </svg>
  );
}
