// ChannelModal.tsx
'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger, Button } from '@river/estuary'
import { HorizontalNav } from './HorizontalNav'
import { SearchContainer } from './search/SearchContainer'
import { Flex } from '@river/estuary'
import { XIcon } from 'lucide-react'
import { Hash } from 'viem'
import { IsAdminOrInTree, MerkleProof } from 'hooks/isAdminOrInTree'


export function ChannelModal() {
  const [activeTab, setActiveTab] = useState<string>('Search')
  const [open, setOpen] = useState<boolean>(false)
  const [isAdmin, setIsAdmin] = useState<boolean>(true)
  const [isInTree, setIsInTree] = useState<boolean>(false);
  const [merkleProof, setMerkleProof] = useState<MerkleProof | null>(null);



  const handleIsInTreeStatus = (status: boolean) => {
    
    setIsInTree(status);
  };

  const handleMerkleProofChange = (proof: MerkleProof) => {
    setMerkleProof(proof);
  };




return (
  <>
     <IsAdminOrInTree 
          isAdminStatus={setIsAdmin} 
          isInTreeStatus={handleIsInTreeStatus} 
          onMerkleProofChange={handleMerkleProofChange} 
      />
      {(isAdmin || isInTree) && (
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
            {activeTab === 'Search' ?<SearchContainer isAdmin={isAdmin} setAdminStatus={setIsAdmin} merkleProof={merkleProof} />
 : null} 
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
