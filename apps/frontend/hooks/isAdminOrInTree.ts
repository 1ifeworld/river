import { useState, useEffect, useRef } from "react";
import { useAccount } from "wagmi";
import { usePathname } from "next/navigation";
import { Hex, Hash, getAddress } from "viem";
import { getChannel } from "gql/requests";
import { getTreeFromRoot, getMerkleProofs } from ".";
import { getTree } from "lanyard";

export type MerkleProof = {
  unhashedLeaf: string;
  proof: string[];
};

interface IsAdminProps {
  isAdminStatus: (isAdmin: boolean) => void;
  isInTreeStatus: (isInTree: boolean) => void;
  onMerkleProofChange?: (merkleProof: MerkleProof) => void;
}

async function isInTree(merkleRoot: Hash, address: Hex): Promise<boolean> {
  const treeStatus = await getTreeFromRoot(merkleRoot, address);
  return !!treeStatus;
}

export function IsAdminOrInTree({
  isAdminStatus,
  isInTreeStatus,
  onMerkleProofChange,
}: IsAdminProps) {
  const pathname = usePathname();
  const cleanedPathname = getAddress(pathname.slice(9));
  const { address } = useAccount() as { address: Hex };

  useEffect(() => {
    async function checkUserPermissions() {
      let isAdminResult = false;
      let isInTreeResult = false;

      try {
        const channelData = await getChannel({ channel: cleanedPathname });
        const adminData = channelData.channels[0];

        isAdminResult = adminData?.logicTransmitterMerkleAdmin[0]?.accounts?.includes(address) || false;

        const merkleRoot = adminData?.logicTransmitterMerkleAdmin[0]?.merkleRoot as `0x${string}`;

        if (merkleRoot) {
          const tree = await getTreeFromRoot(merkleRoot, address);

          isInTreeResult = tree?.unhashedLeaves
            ?.map((addr: Hex) => addr.toLowerCase())
            .includes(address.toLowerCase()) || false;

          if (isInTreeResult && onMerkleProofChange) {
            const proof = await getMerkleProofs(merkleRoot, address);
            onMerkleProofChange(proof);
          }
        }
      } catch (error) {
        console.error("Error checking user permissions:", error);
      } finally {
        isAdminStatus(isAdminResult);
        isInTreeStatus(isInTreeResult);
      }
    }

    checkUserPermissions();
  }, [address, cleanedPathname, onMerkleProofChange]);

  return null;
}