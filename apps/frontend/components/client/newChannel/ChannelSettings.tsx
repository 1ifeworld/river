import { useState, useCallback } from 'react'
import {
  Input,
  Stack,
  Headline,
  Button,
  Flex,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@river/estuary'
import { PlusIcon } from 'lucide-react'
import { useAccount } from 'wagmi'
import { useGetAddressDisplay } from '@/hooks'
import { zeroAddress, Hex } from 'viem'
import { LanyardMerkle } from './index'

interface ChannelSettingsProps {
  name: string
  description: string
  setMerkleRoot: React.Dispatch<React.SetStateAction<Hex>>
  setName: React.Dispatch<React.SetStateAction<string>>
  setDescription: React.Dispatch<React.SetStateAction<string>>
}

export function ChannelSettings({
  name,
  setName,
  setMerkleRoot,
  description,
  setDescription,
}: ChannelSettingsProps) {
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
    <Stack className="gap-4">
      <span>
        <Input
          type="text"
          variant="ghost"
          placeholder="Channel Name"
          className="text-2xl font-medium"
          value={name}
          onChange={handleNameChange}
        />
        <Flex className="items-center gap-2">
          <Headline className="text-label-muted font-normal cursor-default">
            {display}
          </Headline>
          <Popover>
            <PopoverTrigger>
              <Button size="icon" shape="circle">
                <PlusIcon />
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
      </span>
      <Input
        type="text"
        variant="ghost"
        placeholder="Add description"
        onChange={handleDescriptionChange}
      />
    </Stack>
  )
}
