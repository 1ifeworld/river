import { PropsWithChildren } from 'react';
import { cn } from '../utils/cn';

type StackProps = PropsWithChildren<{
  className?: string;
}>;

export function Stack({ className, children }: StackProps) {
  return <div className={cn('flex flex-col', className)}>{children}</div>;
}
