import React from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';

export function SideNav() {
  return (
    <ScrollArea.Root className='w-[248px] h-screen overflow-hidden bg-white border-r'>
      <ScrollArea.Viewport className='w-full h-full'>
        <div className='py-[15px] px-5'></div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
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
      <ScrollArea.Corner className='bg-green-500' />
    </ScrollArea.Root>
  );
}
