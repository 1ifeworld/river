import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Body } from './Typography';
import { Flex } from '../elements';

import { cn } from '../utils';
import { IconContainer } from './IconContainer';

const buttonVariants = cva(
  'inline-flex justify-center items-center justify-center text-label ring-offset-background transition-colors transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
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
        md: 'h-10 px-7 py-2',
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
      {
        variant: ['link'],
        className: 'p-0 h-4',
      },
      {
        size: 'icon',
        className: 'border-none'
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
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'prefix'>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  prefix?: string
  suffix?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, shape, size, asChild = false, loading, prefix, suffix, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    const labelContent = (
      <Body
        className={variant === 'secondary' ? 'text-[#ffffff] font-medium' : 'text-label font-medium'}
      >
        {props.children}
      </Body>
    )

    let childContent: React.ReactNode;

    if (loading) {
      childContent = <IconContainer icon='Loader2' className='animate-spin' />
    } else if (prefix) {
      childContent = (
        <Flex className='items-center gap-2'>
          <IconContainer icon={prefix} />
          {labelContent}
        </Flex>
      );
    } else if (suffix) {
      childContent = (
        <Flex className='items-center gap-2'>
          {labelContent}
          <IconContainer icon={suffix} />
        </Flex>
      );
    } else {
      childContent = labelContent
    }


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
        {childContent}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };