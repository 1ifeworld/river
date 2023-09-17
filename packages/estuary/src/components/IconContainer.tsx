import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Flex } from '../elements';

import { cn } from '../utils';

const iconContainerVariants = cva(
  'bg-base justify-center items-center hover:bg-base-shade text-label-muted hover:text-label transition-all',
  {
    variants: {
      variant: {
        default: 'rounded-full',
        square: 'rounded',
      },
      size: {
        default: 'h-8 w-8 p-[0.5px]',
        sm: 'h-4 w-4 p-1',
      },
    },
    compoundVariants: [
      {
        variant: 'square',
        size: 'sm',
        className: 'rounded-[1px]',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface IconContainerProps
  extends React.PropsWithChildren,
    VariantProps<typeof iconContainerVariants> {
  className?: string;
}

function IconContainer(props: IconContainerProps) {
  return (
    <Flex
      className={cn(
        iconContainerVariants({ variant: props.variant, size: props.size }),
        props.className
      )}
    >
      {props.children}
    </Flex>
  );
}

IconContainer.displayName = 'IconContainer';

export { IconContainer, type iconContainerVariants };
