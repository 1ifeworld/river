'use client'

import React, { useState } from 'react'

import { Dialog, DialogContent, DialogTrigger, Button } from '@river/estuary'
import { HorizontalNav } from './HorizontalNav'
import { SearchContainer } from './search/SearchContainer'
import { Flex } from '@river/estuary'
import { XIcon } from 'lucide-react'

export function ChannelModal() {
  const [activeTab, setActiveTab] = useState<string>('Search')
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="focus-outline:none">
        <Button variant="secondary">Add</Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col border-[0.5px] border-base-border rounded-[14px] h-fit">
        <Flex className="items-center px-4">
          <HorizontalNav activeTab={activeTab} setActiveTab={setActiveTab} />
          <Button onClick={() => setOpen(false)} size="icon" shape="circle">
            <XIcon />
          </Button>
        </Flex>
        {activeTab === 'Search' ? <SearchContainer /> : null}
      </DialogContent>
    </Dialog>
  )
}
