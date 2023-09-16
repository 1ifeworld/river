import * as React from 'react';
import { cn } from '../utils';
import { type SvgProps } from './types';

export function SearchIcon({ width = '13', fill, className }: SvgProps) {
  return (
    <svg
      width={width}
      height={width}
      viewBox='0 0 15 15'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M9.48104 9.48108C9.76099 9.20113 10.2149 9.20113 10.4948 9.48108L14.29 13.2763C14.57 13.5562 14.57 14.0101 14.29 14.2901C14.0101 14.57 13.5562 14.57 13.2762 14.2901L9.48104 10.4949C9.20108 10.2149 9.20108 9.76104 9.48104 9.48108Z'
        fill={fill}
      />
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M6.19278 10.4518C8.54499 10.4518 10.4518 8.54499 10.4518 6.19278C10.4518 3.84058 8.54499 1.93374 6.19278 1.93374C3.84058 1.93374 1.93374 3.84058 1.93374 6.19278C1.93374 8.54499 3.84058 10.4518 6.19278 10.4518ZM6.19278 11.8856C9.33682 11.8856 11.8856 9.33682 11.8856 6.19278C11.8856 3.04875 9.33682 0.5 6.19278 0.5C3.04875 0.5 0.5 3.04875 0.5 6.19278C0.5 9.33682 3.04875 11.8856 6.19278 11.8856Z'
        fill={fill}
      />
    </svg>
  );
}
