import * as React from 'react';

import { cn } from '../utils';

export interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

export function Headline({ children, className }: TypographyProps) {
  return (
    <h1
      className={cn(
        'text-2xl font-sans antialiased cursor-default',
        className
      )}
    >
      {children}
    </h1>
  );
}

export function BodyExtraLarge({ children, className }: TypographyProps) {
  return (
    <p
      className={cn(
        'text-xl font-sans antialiased cursor-default',
        className
      )}
    >
      {children}
    </p>
  );
}

export function BodyLarge({ children, className }: TypographyProps) {
  return (
    <p
      className={cn(
        'text-lg font-sans antialiased cursor-default',
        className
      )}
    >
      {children}
    </p>
  );
}

export function Body({ children, className }: TypographyProps) {
  return (
    <p
      className={cn(
        'text-base font-sans antialiased cursor-default',
        className
      )}
    >
      {children}
    </p>
  );
}

export function BodySmall({ children, className }: TypographyProps) {
  return (
    <p
      className={cn(
        'text-sm font-sans antialiased cursor-default',
        className
      )}
    >
      {children}
    </p>
  );
}
