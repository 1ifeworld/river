// ChannelModal.tsx
'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger, Button } from '@river/estuary'
import { HorizontalNav } from './HorizontalNav'
import { SearchContainer } from './search/SearchContainer'
import { Flex } from '@river/estuary'
import { XIcon } from 'lucide-react'
import { Hash } from 'viem'
import { IsAdminOrInTree } from 'hooks/isAdminOrInTree'

export function ChannelModal() {
  const [activeTab, setActiveTab] = useState<string>('Search')
  const [open, setOpen] = useState<boolean>(false)
  const [isAdmin, setIsAdmin] = useState<boolean>(true)

  const handleIsInTreeStatus = (isInTree: boolean) => {
    // Handle the isInTree status here
};

const handleMerkleProofChange = (merkleProof: Hash) => {
    // Handle the merkleProof here
};

  return (
    <>
        <IsAdminOrInTree 
            isAdminStatus={setIsAdmin} 
            isInTreeStatus={handleIsInTreeStatus} 
            onMerkleProofChange={handleMerkleProofChange} 
        />
        {isAdmin && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className="focus-outline:none">
            <Button>Add</Button>
          </DialogTrigger>
          <DialogContent className="flex flex-col border-[0.5px] border-base-border rounded-[14px] h-fit">
            <Flex className="items-center px-4">
              <HorizontalNav activeTab={activeTab} setActiveTab={setActiveTab} />
              <Button onClick={() => setOpen(false)} size="icon" shape="circle">
                <XIcon />
              </Button>
            </Flex>
            {activeTab === 'Search' ?<SearchContainer isAdmin={isAdmin} setAdminStatus={setIsAdmin} />
 : null} 
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
