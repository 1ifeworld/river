import React, { useState, useEffect } from 'react'
import { Input, Stack, Button } from '@river/estuary'
import { createLanyardTree } from '@/hooks'

interface Props {
  onMerkleRootChange: (merkle: string) => void
}

export function LanyardMerkle({ onMerkleRootChange }: Props) {
  const [addresses, setAddresses] = useState<string[]>([]);
  const [inputAddress, setInputAddress] = useState<string>('');
  const [merkleRoot, setMerkleRoot] = useState<string>('');

  useEffect(() => {
    const generateTree = async () => {
      if (addresses.length === 0) {
        console.log("No addresses to generate Merkle tree.");
        return;
      }

      if (addresses.every(isValidAddress)) {
        try {
          const response = await createLanyardTree(addresses);
          if (response && response.merkle) {
            console.log("Generated Merkle root:", response.merkle);
            setMerkleRoot(response.merkle);
            onMerkleRootChange(response.merkle);
          } else if (response && response.error) {
            console.error("Error from createLanyardTree:", response.error);
          }
        } catch (error) {
          console.error("Error generating Merkle tree:", error);
        }
      } else {
        console.warn("Some addresses are not valid.");
      }
    };
    generateTree();
  }, [addresses]);

  function isValidAddress(address: string): address is `0x${string}` {
    return address.startsWith('0x') && address.length === 42;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputAddress(e.target.value);
  };

  const handleAddAddress = () => {
    if (isValidAddress(inputAddress)) {
      console.log("Address added:", inputAddress); 
      setAddresses(prevAddresses => [...prevAddresses, inputAddress]);
      setInputAddress('');
    } else {
      console.warn("Invalid address format:", inputAddress);
    }
  };

  return (
    <Stack>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Input
          type="text"
          placeholder="Enter an address"
          value={inputAddress}
          onChange={handleInputChange}
        />
        <Button onClick={handleAddAddress}>Add Address</Button>
      </div>
      <ul>
        {addresses.map((address, index) => (
          <li key={index}>{address}</li>
        ))}
      </ul>
    </Stack>
  );
}
