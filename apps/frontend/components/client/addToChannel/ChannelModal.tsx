// ChannelModal.tsx
"use client";

import React, { useState, useCallback, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  Button,
  Flex,
} from "@river/estuary";
import { XIcon } from "lucide-react";
import { useAccount } from "wagmi";
import { IsAdminOrInTree, MerkleProof } from "hooks/isAdminOrInTree";
import { HorizontalNav } from "./HorizontalNav";
import { SearchContainer } from "./search/SearchContainer";

export function ChannelModal() {
  const [activeTab, setActiveTab] = useState<string>("Search");
  const [open, setOpen] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [isInTree, setIsInTree] = useState<boolean | null>(null);
  const [merkleProof, setMerkleProof] = useState<MerkleProof | null>(null);
  const [showButton, setShowButton] = useState<boolean>(false);

  const { address } = useAccount();

  const handleIsInTreeStatus = useCallback((status: boolean) => {
    setIsInTree(status);
  }, []);

  const handleMerkleProofChange = useCallback((proof: MerkleProof) => {
    setMerkleProof(proof);
  }, []);

  useEffect(() => {
    if (isAdmin !== null && isInTree !== null) {
      if (isAdmin || isInTree) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    }
  }, [isAdmin, isInTree]);

  return (
    <>
      <IsAdminOrInTree
        isAdminStatus={setIsAdmin}
        isInTreeStatus={handleIsInTreeStatus}
        onMerkleProofChange={handleMerkleProofChange}
      />

      {address && showButton && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className="focus-outline:none">
            <Button variant="secondary">Add</Button>
          </DialogTrigger>
          <DialogContent className="flex flex-col border-[0.5px] border-base-border rounded-[14px] h-fit">
            <Flex className="items-center px-4">
              <HorizontalNav
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              <Button onClick={() => setOpen(false)} size="icon" shape="circle">
                <XIcon />
              </Button>
            </Flex>
            {activeTab === "Search" && (
              <SearchContainer
                isAdmin={isAdmin ?? false}
                setAdminStatus={setIsAdmin}
                merkleProof={merkleProof}
              />
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
