import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { usePathname } from "next/navigation";
import { Hex, Hash, getAddress} from "viem";
import { getChannel } from "gql/requests";

import { getTreeFromRoot, getMerkleProofs } from ".";
import { getTree } from "lanyard";

interface IsAdminProps {
  isAdminStatus: (isAdmin: boolean) => void;
  isInTreeStatus: (isInTree: boolean) => void;
  onMerkleProofChange?: (merkleProof: Hash) => void; 
}
async function isAdmin(address: Hex, cleanedPathname: string): Promise<boolean> {
  const channelData = await getChannel({ channel: cleanedPathname });
  const adminData = channelData.channels[0];
  return !!adminData?.logicTransmitterMerkleAdmin[0]?.accounts?.includes(address);
}

async function isInTree(merkleRoot: Hash, address: Hex): Promise<boolean> {
  const treeStatus = await getTreeFromRoot(merkleRoot, address);
  return !!treeStatus;
}

export function IsAdminOrInTree({ isAdminStatus, isInTreeStatus, onMerkleProofChange }: IsAdminProps) {
  const pathname = usePathname();
  const cleanedPathname = getAddress(pathname.slice(9));
  const { address } = useAccount() as { address: Hex };

  useEffect(() => {
      async function checkUserPermissions() {
          const isUserAdmin = await isAdmin(address, cleanedPathname);
          isAdminStatus(isUserAdmin);

          if (isUserAdmin) {
              return;
          }

          const channelData = await getChannel({ channel: cleanedPathname });
          const adminData = channelData.channels[0];
          const merkleRoot = adminData?.logicTransmitterMerkleAdmin[0]?.merkleRoot as `0x${string}`;

          if (merkleRoot) {
              const isUserInTree = await isInTree(merkleRoot, address);
              isInTreeStatus(isUserInTree);

              if (isUserInTree) {
                  // Generate the Merkle proof
                  const proof = await getMerkleProofs(merkleRoot, address);
                  if (onMerkleProofChange) {
                      onMerkleProofChange(proof);
                  }
              }
          } else {
              isInTreeStatus(false);
          }
      }

      checkUserPermissions();
  }, [address, cleanedPathname, isAdminStatus, isInTreeStatus, onMerkleProofChange]);

  return null; 
}