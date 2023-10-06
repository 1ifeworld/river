"use client"

import * as React from 'react';
import { icons } from 'lucide-react';

const IconContainer = ({ className, icon, color, size = '16' }: { className?: string, icon: string, color?: string, size?: '16' | '24' | '32'}) => {
  const LucideIcon = icons[icon as keyof typeof icons];

  return <LucideIcon className={className} color={color} size={size} />;
};

IconContainer.displayName = 'IconContainer';

export { IconContainer };


