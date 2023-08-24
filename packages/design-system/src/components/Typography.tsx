import * as React from 'react';
import { cn } from '../utils';

export interface TypographyProps {
  children: React.ReactNode;
  className?: string;
};

export function Headline({ children, className }: TypographyProps) {
  return (
    <p
      className={cn(
        'text-2xl/10 font-medium tracking-[-0.5px] font-sans',
        className
      )}
    >
      {children}
    </p>
  );
}

export function BodyLarge({ children, className }: TypographyProps) {
  return (
    <p className={cn('text-lg/7 font-medium font-sans', className)}>
      {children}
    </p>
  );
}

export function Body({ children, className }: TypographyProps) {
  return (
    <p className={cn('text-base font-normal font-sans', className)}>
      {children}
    </p>
  );
}

export function BodySmall({ children, className }: TypographyProps) {
  return (
    <p className={cn('text-sm font-normal font-sans', className)}>{children}</p>
  );
}

export function BodyExtraSmall({ children, className }: TypographyProps) {
  return (
    <span className={cn('text-xs font-normal font-sans', className)}>
      {children}
    </span>
  );
}

export function Caption({ children, className }: TypographyProps) {
  return (
    <p className={cn('text-xs/[15px] font-normal font-mono', className)}>
      {children}
    </p>
  );
}

export function CaptionLarge({ children, className }: TypographyProps) {
  return (
    <p className={cn('text-sm font-normal font-mono', className)}>{children}</p>
  );
}