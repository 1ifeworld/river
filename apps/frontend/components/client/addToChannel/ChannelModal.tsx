'use client'

import React, { useState, useCallback, useEffect } from 'react'

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  Button,
  Stack,
  Flex,
} from '@river/estuary'
import { XIcon } from 'lucide-react'
import { useAccount } from 'wagmi'
import { IsAdminOrInTree, MerkleProof } from 'hooks/useIsAdminOrInTree'
import { HorizontalNav } from './HorizontalNav'
import { SearchContainer } from './search/SearchContainer'

function PlaceholderButton() {
  return <Button variant="secondary" className="opacity-0"></Button>
}

export function ChannelModal() {
  const [activeTab, setActiveTab] = useState<string>('Search')
  const [open, setOpen] = useState<boolean>(false)
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const [isInTree, setIsInTree] = useState<boolean | null>(null)
  const [merkleProof, setMerkleProof] = useState<MerkleProof | null>(null)
  const [showButton, setShowButton] = useState<boolean>(false)

  const { address } = useAccount()

  const handleIsInTreeStatus = useCallback((status: boolean) => {
    setIsInTree(status)
  }, [])

  const handleMerkleProofChange = useCallback((proof: MerkleProof) => {
    setMerkleProof(proof)
  }, [])

  useEffect(() => {
    if (isAdmin !== null && isInTree !== null) {
      if (isAdmin || isInTree) {
        setShowButton(true)
      } else {
        setShowButton(false)
      }
    }
  }, [isAdmin, isInTree])

  const shouldShowPlaceholder = !address || !showButton

  return (
    <>
      <IsAdminOrInTree
        isAdminStatus={setIsAdmin}
        isInTreeStatus={handleIsInTreeStatus}
        onMerkleProofChange={handleMerkleProofChange}
      />

      <div className="h-10 w-32">
        {showButton && address ? (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="focus-outline:none h-full w-full">
              <Button variant="secondary">Add</Button>
            </DialogTrigger>
            <DialogContent className="border-[0.5px] border-base-border rounded-[14px] h-fit">
              <Flex className="items-center px-4">
                <HorizontalNav
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
                <Button
                  onClick={() => setOpen(false)}
                  size="icon"
                  shape="circle"
                >
                  <XIcon />
                </Button>
              </Flex>
              {activeTab === 'Search' && (
                <SearchContainer
                  isAdmin={isAdmin ?? false}
                  setAdminStatus={setIsAdmin}
                  merkleProof={merkleProof}
                />
              )}
            </DialogContent>
          </Dialog>
        ) : (
          <PlaceholderButton />
        )}
      </div>
    </>
  )
}
