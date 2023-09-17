'use client';

import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

interface TooltipProps {
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  children: React.ReactNode;
  content: React.ReactNode;
}

const TooltipProvider = TooltipPrimitive.Provider;

const TooltipRoot = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = TooltipPrimitive.Content;

const TooltipPortal = TooltipPrimitive.Portal;

export function Tooltip({ side, align, children, content }: TooltipProps) {
  return (
    <TooltipProvider>
      <TooltipRoot>
        <TooltipTrigger asChild className='cursor-pointer'>
          {children}
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent
            className='bg-base border-[0.5px] border-base-border px-5 py-4 rounded-[10px] shadow-sm'
            sideOffset={4}
            side={side}
            align={align}
          >
            {content}
          </TooltipContent>
        </TooltipPortal>
      </TooltipRoot>
    </TooltipProvider>
  );
}

// Unused Primitive Parts

// TooltipPrimitive.Portal
// TooltipPrimitive.Arrow;
