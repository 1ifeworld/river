import React, { useState, useEffect } from 'react'
import { Input, Stack, Label, Button, Flex, Grid } from '@river/estuary'
import { createLanyardTree } from '@/hooks'
import { useAccount } from 'wagmi'
import { Plus } from 'lucide-react'
import { getAddressDisplay } from 'utils/getAddressDisplay'
import { isAddress, Hash, Hex } from 'viem'
import { resolveEnsOrAddress } from '../../../utils/resolveENSorAddress'

interface Props {
  onMerkleRootChange: (merkle: Hash) => void
  currentMerkleRoot?: Hex
}

const isValidAddress = (address: string): boolean => {
  return isAddress(address)
}

export function LanyardMerkle({
  onMerkleRootChange,
  currentMerkleRoot,
}: Props) {
  const { address } = useAccount()
  const [addresses, setAddresses] = useState<string[]>(address ? [address] : [])
  const [inputAddress, setInputAddress] = useState<string>('')
  const [merkleRoot, setMerkleRoot] = useState<Hex | undefined>(
    currentMerkleRoot,
  )
  const [resolvedAddresses, setResolvedAddresses] = useState<string[]>([])

  useEffect(() => {
    const generateTree = async () => {
      if (!addresses.length) return

      const is0xString = (str: string): str is `0x${string}` => {
        return str.startsWith('0x')
      }
      const validAddresses = addresses.filter(isValidAddress).filter(is0xString)

      if (validAddresses.length === addresses.length) {
        try {
          const response = await createLanyardTree(validAddresses)
          if (response?.merkle) {
            setMerkleRoot(response.merkle)
            onMerkleRootChange(response.merkle)
            console.log('Merkle root in LanyardMerkle:', response.merkle)
          } else if (response?.error) {
            console.error('Error from createLanyardTree:', response.error)
          }
        } catch (error) {
          console.error('Error generating Merkle tree:', error)
        }
      } else {
        const invalidAddresses = addresses.filter(
          (addr) => !isValidAddress(addr) || !is0xString(addr),
        )
        console.log('Invalid addresses:', invalidAddresses)
        console.warn('Some addresses are not valid.')
      }
    }
    generateTree()
  }, [addresses, onMerkleRootChange])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputAddress(e.target.value)
  }

  const handleAddAddress = async () => {
    const resolvedInput = await resolveEnsOrAddress(inputAddress)
    if (isAddress(resolvedInput)) {
      setAddresses((prevAddresses) => [...prevAddresses, resolvedInput])
      // Get the ENS name for the resolved address
      const ensNameOrAddress = await getAddressDisplay(resolvedInput)
      setResolvedAddresses((prevResolved) => [
        ...prevResolved,
        ensNameOrAddress,
      ])
      setInputAddress('')
    } else {
      console.warn('Invalid address or ENS format:', inputAddress)
    }
  }

  return (
    <Stack className="gap-y-4">
      <Label
        htmlFor="memberAddressInput"
        className="text-[#7B7B7B] w-fit text-[10px]"
      >
        Add Members
      </Label>

      <Flex className="items-center gap-x-2">
        <Input
          id="memberAddressInput"
          type="text"
          placeholder="Enter an ENS or Ethereum address"
          value={inputAddress}
          onChange={handleInputChange}
        />
        <Button size="icon" shape="circle" onClick={handleAddAddress}>
          <Plus />
        </Button>
      </Flex>

      <ul>
        {resolvedAddresses.map((addr, index) => (
          <li
            key={index}
          >
            {addr}
          </li>
        ))}
      </ul>
    </Stack>
  )
}
