import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../utils';

const cardVariants = cva(
  'aspect-square overflow-hidden object-cover outline outline-[0.5px] outline-base-border',
  {
    variants: {
      size: {
        default: 'md:min-h-[224px] md:min-w-[224px]',
        sm: 'min-h-[160px] min-w-[160px]',
        lg: 'min-h-[248px] min-w-[248px]',
        icon: 'min-h-[48px] min-w-[48px] rounded-[1.5px]',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

interface CardProps
  extends React.PropsWithChildren,
    VariantProps<typeof cardVariants> {
  className?: string;
}

function Card(props: CardProps) {
  return (
    <div
      className={cn(
        cardVariants({ size: props.size ?? 'default' }),
        props.className
      )}
    >
      {props.children}
    </div>
  );
}

Card.displayName = 'Card';

export { Card, type CardProps };