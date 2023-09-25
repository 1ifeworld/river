import { useState, useCallback } from 'react'
import {
  Input,
  Stack,
  BodyLarge,
  Button,
  Flex,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@river/estuary'
import { PlusCircle } from 'lucide-react'
import { useAccount } from 'wagmi'
import { useGetAddressDisplay } from '@/hooks'
import { zeroAddress, Hex } from 'viem'
import { LanyardMerkle } from '.'

interface ChannelUriProps {
  name: string
  description: string
  setMerkleRoot: React.Dispatch<React.SetStateAction<Hex>>
  setName: React.Dispatch<React.SetStateAction<string>>
  setDescription: React.Dispatch<React.SetStateAction<string>>
}

export function ChannelUri({
  name,
  setName,
  setMerkleRoot,
  description,
  setDescription,
}: ChannelUriProps) {
  const { address } = useAccount()
  const { display } = useGetAddressDisplay(address || zeroAddress)
  const [localMerkleRoot, setLocalMerkleRoot] = useState<Hex | undefined>()

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value)
    },
    [setName],
  )

  const handleDescriptionChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDescription(e.target.value)
    },
    [setDescription],
  )

  return (
    <Stack className="gap-2">
      <Input
        type="text"
        variant="ghost"
        placeholder="Channel Name"
        className="text-2xl"
        value={name}
        onChange={handleNameChange}
      />
      <Flex>
        <BodyLarge className="text-label-muted">{display}</BodyLarge>
        <Popover>
          <PopoverTrigger>
            <Button className="border-none" size="icon" shape="circle">
              <PlusCircle />
            </Button>
          </PopoverTrigger>
          <Flex>
            <PopoverContent>
              <LanyardMerkle
                onMerkleRootChange={setMerkleRoot}
                currentMerkleRoot={localMerkleRoot}
              />
            </PopoverContent>
          </Flex>
        </Popover>
      </Flex>
      <Input
        type="text"
        variant="ghost"
        placeholder="Add description"
        onChange={handleDescriptionChange}
      />
    </Stack>
  )
}
