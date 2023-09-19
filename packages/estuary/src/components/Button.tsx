import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Body } from './Typography';

import { cn } from '../utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center text-label rounded-md ring-offset-background transition-colors transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-base border border-base-border shadow-soft hover:bg-base-hover',
        secondary: 'bg-label text-[#ffffff] shadow-soft hover:bg-label/80',
        link: 'underline-offset-4 hover:underline',
        pill: 'bg-base border border-base-border shadow-soft hover:bg-base-hover rounded-full',
      },
      size: {
        default: 'h-10 px-10 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        // TODO: determine if we'll continue to need an icon variant
        // icon: 'h-10 w-10 rounded-full',
      },
    },
    compoundVariants: [
      {
        variant: 'pill',
        size: 'sm',
        className: 'rounded-full px-4',
      },
      {
        variant: 'pill',
        size: 'lg',
        className: 'rounded-full',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.PropsWithChildren,
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <Body
          className={variant === 'secondary' ? 'text-[#ffffff]' : 'text-label'}
        >
          {props.children}
        </Body>
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
