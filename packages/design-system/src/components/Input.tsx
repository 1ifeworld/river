import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const inputVariants = cva(
  'flex h-10 w-full bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'border border-input px-3 py-2 placeholder:text-muted-foreground rounded-md',
        ghost: 'p-1 placeholder:text-label',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
