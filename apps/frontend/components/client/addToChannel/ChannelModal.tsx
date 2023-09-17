'use client'

import React, { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  Button,
  Body,
  Exit,
  Stack,
} from '@river/estuary'
import { HorizontalNav } from './HorizontalNav'
import { SearchContainer } from './search/SearchContainer'
import { Flex } from '@river/estuary'

export function ChannelModal() {
  const [activeTab, setActiveTab] = useState<string>('Search')
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="focus-outline:none">
        <Button>
          <Body className="font-medium">+ Add</Body>
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col border-[0.5px] border-base-border rounded-[14px] h-fit">
        <Flex className="items-center px-4">
          <HorizontalNav activeTab={activeTab} setActiveTab={setActiveTab} />
          <Button
            onClick={() => setOpen(false)}
            variant="outline"
            size="icon"
            className="rounded-full w-[18px] h-[18px] bg-[#BEBEBE] border-none bg-[#F2F2F2] hover:bg-[#A8A8A8]"
          >
            <Exit className="stroke-[#393939] hover:stroke-[#FEFEFE]" />
          </Button>
        </Flex>
        {activeTab === 'Search' ? <SearchContainer /> : null}
      </DialogContent>
    </Dialog>
  )
}
