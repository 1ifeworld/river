'use client';
import React, { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button,
  Debug,
  Body,
  Exit,
} from '@river/design-system';
import { StateNav } from './StateNav';
import { SearchContainer } from './states/search/SearchContainer';
import { Flex } from '@river/design-system';

export function ChannelModal() {
  const [activeTab, setActiveTab] = useState<string>('Search');
  const [open, setOpen] = useState<boolean>(false);

  return (
    // open
    <Dialog open={true} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className='w-[112px]'>
          <Body className='font-medium'>+ Add</Body>
        </Button>
      </DialogTrigger>
      <DialogContent className='flex flex-col border-[0.5px] rounded-[14px] border-base-border w-full sm:w-[488px] h-fit'>
        <Flex className='items-center px-4'>
          <StateNav
            closeModal={setOpen}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          {/* <Button
            onClick={() => setOpen(false)}
            variant='outline'
            size='icon'
            className='rounded-full w-[18px] h-[18px] bg-[#BEBEBE] border-none bg-[#F2F2F2] hover:bg-[#A8A8A8]'
          >
            <Exit className='stroke-[#393939] hover:stroke-[#FEFEFE]' />
          </Button> */}
        </Flex>
        {activeTab === 'Search' ? <SearchContainer /> : null}
      </DialogContent>
    </Dialog>
  );
}
