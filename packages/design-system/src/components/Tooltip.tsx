'use client'

import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { cn } from '../utils';

interface TooltipProps {
  side?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode
}

const TooltipProvider = TooltipPrimitive.Provider;

const TooltipRoot = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipPortal = TooltipPrimitive.Portal;

const TooltipContent = TooltipPrimitive.Content;

const TooltipArrow = TooltipPrimitive.Arrow;

export function Tooltip({ side, children }: TooltipProps) {
  return (
    <TooltipProvider>
      <TooltipRoot>
        <TooltipTrigger asChild>
            <p>Open me</p>
        </TooltipTrigger>
        <TooltipContent side={side}>
            {children}
        </TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  );
}
