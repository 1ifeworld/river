import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Body } from './Typography';
import { Loader2Icon } from 'lucide-react';

import { cn } from '../utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center text-label ring-offset-background transition-colors transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-base border border-base-border hover:bg-base-hover',
        secondary: 'bg-label text-[#ffffff] hover:bg-label/80',
        link: 'underline-offset-4 hover:underline',
      },
      shape: {
        square: 'rounded-md',
        circle: 'rounded-full',
      },
      size: {
        sm: 'h-9 px-3',
        md: 'h-10 px-10 py-2',
        lg: 'h-11 px-8',
        icon: 'h-8 w-8 p-2',
      },
    },
    compoundVariants: [
      {
        variant: ['primary', 'secondary', 'link'],
        size: ['sm', 'md', 'lg'],
        shape: 'circle',
        className: 'px-6',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      shape: 'square',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.PropsWithChildren,
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, shape, size, asChild = false, loading, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    if (size === 'icon') {
      return (
        <Comp
          className={cn(buttonVariants({ variant, shape, size, className }))}
          ref={ref}
          {...props}
        >
          {props.children}
        </Comp>
      );
    }
    return (
      <Comp
        className={cn(buttonVariants({ variant, shape, size, className }))}
        ref={ref}
        {...props}
      >
        <Body
          className={variant === 'secondary' ? 'text-[#ffffff] font-medium' : 'text-label font-medium'}
        >
          {
            loading ? <Loader2Icon className='animate-spin' size='16' /> :
              props.children
          }
        </Body>
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
