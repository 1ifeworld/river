import { useState, useEffect } from "react";
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

export function IsAdminOrInTree({ isAdminStatus, isInTreeStatus, onMerkleProofChange }: IsAdminProps) {
  const pathname = usePathname();
  const cleanedPathname = getAddress(pathname.slice(9));
  const { address } = useAccount() as { address: Hex };

  useEffect(() => {
    async function checkUserPermissions() {
      try {
          const channelData = await getChannel({ channel: cleanedPathname });
          const adminData = channelData.channels[0];
  
          if (adminData?.logicTransmitterMerkleAdmin[0]?.accounts?.includes(address)) { 
              console.log("User is an admin.");
              isAdminStatus(true);
          } else {
              console.log("User is not an admin.");
              isAdminStatus(false);
          }
  
          const merkleRoot = adminData?.logicTransmitterMerkleAdmin[0]?.merkleRoot as `0x${string}`;
          console.log("Merkle Root:", merkleRoot);
          console.log("Address:", address);
  
          if (merkleRoot) {
            try {
                const tree = await getTreeFromRoot(merkleRoot, address);
                console.log("Tree Status:", tree);
                
                if (tree?.unhashedLeaves?.map((addr: Hex) => addr.toLowerCase()).includes(address.toLowerCase())) {

                    console.log("User is in the tree.");
                    isInTreeStatus(true);
        
                    // Generate the Merkle proof
                    const proof  = await getMerkleProofs(merkleRoot, address);
                    if (onMerkleProofChange) {
                        onMerkleProofChange(proof);
                        console.log("Merkle Proof!!!:", proof);

                    }
                } else {
                    console.log("User is not in the tree.");

                    isInTreeStatus(false);
                }
            } catch (error: any) {
              if (error?.response?.status === 404) {
                  console.log("User is not in the tree (404 response).");
                  isInTreeStatus(false);
              } else {
                  throw error;
                }
            }
        } else {
            console.log("No Merkle Root available.");
            isAdminStatus(false);
            isInTreeStatus(false);
        }
    } catch (error) {
        console.error("Error checking user permissions:", error);
    }
  }

  checkUserPermissions();
}, [address, cleanedPathname, onMerkleProofChange]);

return null; 
}