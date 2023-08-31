import React from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { Flex, BodySmall } from '@river/design-system';
import Link from 'next/link';

export function SideNav() {
  return (
    <ScrollArea.Root className='w-[196px] h-screen overflow-hidden bg-white border-r border-gray-300'>
      <ScrollArea.Viewport className='w-full h-full'>
        <Flex className='flex-col justify-center px-6 py-8'>
          {/* Overview */}
          {/* <BodySmall className='text-gray-700'>Overview</BodySmall> */}
          {/* Tokens */}
          <BodySmall className='text-gray-700'>Tokens</BodySmall>
          <Link href='/estuary/tokens/colors'>
            <BodySmall>Colors</BodySmall>
          </Link>
          {/* Elements */}
          <BodySmall className='text-gray-700'>Elements</BodySmall>
          <Link href='/estuary/elements/flex'>
            <BodySmall>Flex</BodySmall>
          </Link>
          {/* Components */}
          <BodySmall className='text-gray-700'>Components</BodySmall>
          <Link href='/estuary/components/button'>
            <BodySmall>Button</BodySmall>
          </Link>
        </Flex>
      </ScrollArea.Viewport>
    </ScrollArea.Root>
  );
}

// Viewport code from Radix example
{
  /* <ScrollArea.Scrollbar
        className='flex select-none touch-none p-0.5 bg-onyx transition-colors duration-[160ms] ease-out hover:bg-blackA8 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5'
        orientation='vertical'
      >
        <ScrollArea.Thumb className="flex-1 bg-mauve10 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar
        className='flex select-none touch-none p-0.5 bg-onyx transition-colors duration-[160ms] ease-out hover:bg-blackA8 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5'
        orientation='horizontal'
      >
        <ScrollArea.Thumb className="flex-1 bg-mauve10 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner className='bg-green-500' /> */
}
