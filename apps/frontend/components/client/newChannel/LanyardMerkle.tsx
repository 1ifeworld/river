import React, { useState, useEffect } from 'react'
import { Input, Stack } from '../../../../../packages/estuary/src'
import { createLanyardTree } from '../../../hooks'

interface Props {
  onMerkleRootChange: (merkle: string) => void
}

export function LanyardMerkle({ onMerkleRootChange }: Props) {
  const [addresses, setAddresses] = useState<string[]>([])
  const [inputAddress, setInputAddress] = useState<string>('')
  const [merkleRoot, setMerkleRoot] = useState<string>('')

  useEffect(() => {
    const generateTree = async () => {
      if (addresses.every(isValidAddress)) {
        const response = await createLanyardTree(addresses)
        if (response && response.merkle) {
          setMerkleRoot(response.merkle)
          onMerkleRootChange(response.merkle)
        }
      }
    }
    generateTree()
  }, [addresses])

  function isValidAddress(address: string): address is `0x${string}` {
    return address.startsWith('0x')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAddress = e.target.value
    setInputAddress(newAddress)
    const newAddresses = newAddress
      .split(',')
      .map((addr) => addr.trim())
      .filter(isValidAddress)
    setAddresses(newAddresses)
  }

  return (
    <Stack>
      <Input
        type="text"
        placeholder="Enter addresses separated by commas"
        value={inputAddress}
        onChange={handleInputChange}
      />
    </Stack>
  )
}
