import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Flex } from '../elements';

import { cn } from '../utils';

import { icons } from 'lucide-react';

const iconContainerVariants = cva(
  '',
  {
    variants: {
      size: {
        sm: '16',
        md: '24',
        lg: '32',
      },
    },
    defaultVariants: {
      size: 'sm',
    },
  }
);

export interface IconContainerProps
  extends VariantProps<typeof iconContainerVariants> {
    name: string
    color: string
}

const IconContainer = ({ name, color = 'inherit', size, ...props }: IconContainerProps) => {
  
  const LucideIcon = icons[name as keyof typeof icons];

  if (size === 'sm') {
    return <LucideIcon color={color} size='16' />;
  } 

  if (size === 'md') {
    return <LucideIcon color={color} size='24' />;
  }

  if (size === 'lg') {
    return <LucideIcon color={color} size='32' />;
  }
};


IconContainer.displayName = 'IconContainer';

export { IconContainer, type iconContainerVariants };


