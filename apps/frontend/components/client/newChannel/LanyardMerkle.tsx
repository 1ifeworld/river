import React, { useState, useEffect } from "react";
import { Input, Button, Stack } from "@river/design-system";
import { createLanyardTree } from "../../../hooks";

interface Props {
  onMerkleRootChange?: (merkle: string) => void; 
}
export function LanyardMerkle({ onMerkleRootChange }: { onMerkleRootChange: (merkle: string) => void }) {
  const [addresses, setAddresses] = useState<string[]>([]);
  const [inputAddress, setInputAddress] = useState<string>("");
  const [merkleRoot, setMerkleRoot] = useState<string>("")


  useEffect(() => {
    const generateTree = async () => {
      if (addresses.every(isValidAddress)) {
        const response = await createLanyardTree(addresses);
        if (response && response.merkle) {
          setMerkleRoot(response.merkle);
          if(onMerkleRootChange) {
            onMerkleRootChange(response.merkle);
          }
        }
      }
    };
    generateTree();
  }, [addresses]);

  
  function isValidAddress(address: string): address is `0x${string}` {
    return address.startsWith("0x");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (addresses.length === 0) {
      console.error("No addresses provided.");
      return;
    }
    if (addresses.every(isValidAddress)) {
      const response = await createLanyardTree(addresses as `0x${string}`[]);
      console.log(response);
      setAddresses([]);
    } else {
      console.error("One or more addresses are not valid.");
    }
  };

  const handleAddAddress = () => {
    if (inputAddress) {
      const newAddresses = inputAddress
        .split(",")
        .map((addr) => addr.trim())
        .filter(isValidAddress); // Only add valid addresses
      if (newAddresses.length === 0) {
        console.error("No valid addresses provided.");
        return;
      }
      setAddresses((prev) => [...prev, ...newAddresses]);
      setInputAddress("");
    }
  };


  return (
    <Stack>
      <Input
        type="text"
        placeholder="Enter addresses separated by commas"
        value={inputAddress}
        onChange={(e) => setInputAddress(e.target.value)}
      />
      <Button
        className="rounded w-full bg-accent hover:bg-accent-hover mb-4"
        onClick={handleAddAddress}
      >
        Add Addresses
      </Button>
      <Button
        className="rounded w-full bg-accent hover:bg-accent-hover mb-4"
        onClick={() => {
          if(merkleRoot) {
            console.log(`Merkle root is: ${merkleRoot}`);
          }
        }}
      >
        Create Lanyard Tree
      </Button>
    </Stack>
  );
}
