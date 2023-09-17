import React, { useState, useEffect } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Flex,
  SearchIcon,
  Body,
  Label,
  Stack,
} from '@river/estuary'

import { Input } from '@river/estuary/src/components/Input'

import { networks } from '../../../../constants'
import useGetTokenMetadata from '../../../../hooks/useGetTokenMetadata'
import { Nft } from 'alchemy-sdk'
import Image from 'next/image'
import { Ethereum } from '@river/estuary'

interface NetworkSelectProps {
  selectedNetwork: number
  setSelectedNetwork: React.Dispatch<React.SetStateAction<number>>
}

const getIconPath = (networkId: number) => {
  const networkName = networks[networkId]
  return networkName ? '/icons/ethereum.svg' : ''
}

function NetworkSelect({
  selectedNetwork,
  setSelectedNetwork,
}: NetworkSelectProps) {
  return (
    <Select onValueChange={(value) => setSelectedNetwork(Number(value))}>
      <SelectTrigger
        id="networkSelect"
        className="w-fit h-[40px] border-[1.5px] border-[#DADADA] focus:ring-0"
      >
        <SelectValue>
          <Ethereum />
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {Object.entries(networks).map(([networkId, networkName]) => (
          <SelectItem key={networkId} value={networkId}>
            <Body className="text-label">{networkName}</Body>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

type SearchInputProps = {
  searchResults: Nft | undefined
  setSearchResults: React.Dispatch<React.SetStateAction<Nft | undefined>>
  setSearchParams: (params: {
    network?: number | undefined
    contractAddress?: string | undefined
    tokenId?: string | undefined
  }) => void
}

const SearchInput = ({
  searchResults,
  setSearchResults,
  setSearchParams,
}: SearchInputProps) => {
  // Change the initial state and state type to number instead of string | null
  const [network, setNetwork] = useState<number>(1) // defaulting to Ethereum's ID
  const [contractAddress, setContractAddress] = useState<string>('')
  const [tokenId, setTokenId] = useState<string>('')

  const { tokenMetadata, fetchMetadata } = useGetTokenMetadata({
    network: network,
    address: contractAddress,
    tokenId: tokenId,
  })

  // trigger target metadata fetch
  const handleFetchMetadata = () => {
    fetchMetadata()
  }

  useEffect(() => {
    if (tokenMetadata) {
      setSearchResults(tokenMetadata)
    }
  }, [tokenMetadata])

  useEffect(() => {
    setSearchParams({
      network,
      contractAddress,
      tokenId,
    })
  }, [network, contractAddress, tokenId])

  return (
    <Flex className="items-center justify-between">
      {/* Network select */}
      <Stack className="gap-y-1">
        <Label
          htmlFor="networkSelect"
          className="text-[#7B7B7B] w-fit text-[10px]"
          id="networkSelect"
        >
          Network
        </Label>
        <NetworkSelect
          selectedNetwork={network}
          setSelectedNetwork={setNetwork}
        />
      </Stack>
      {/* Address input */}
      <Flex className="flex-col gap-y-1">
        <Label
          htmlFor="addressInput"
          className="text-[#7B7B7B] w-fit text-[10px]"
        >
          Address
        </Label>
        <Input
          id="addressInput"
          type="text"
          placeholder="0xA837b..."
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
          className="px-2 w-[256px] h-[40px] border-[1.5px] rounded border-[#DADADA] focus-visible:ring-0"
        />
      </Flex>
      {/* Token id input */}
      <Flex className="flex-col gap-y-1">
        <Label
          htmlFor="tokenIdInput"
          className="text-[#7B7B7B] w-fit text-[10px]"
        >
          ID
        </Label>
        <Input
          id="tokenIdInput"
          type="text"
          placeholder="17"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
          className="px-2 w-14 h-[40px] border-[1.5px] border-[#DADADA] focus-visible:outline-none focus-visible:ring-0"
        />
      </Flex>
      {/* Search button */}
      <button
        type="button"
        className="mt-5 self-center rounded-full bg-[#F2F2F2] hover:bg-[#A8A8A8] disabled:bg-[#F2F2F2] focus:outline-none"
        onClick={() => {
          // Handle the search here using network, contractAddress, and tokenId
          handleFetchMetadata()
        }}
      >
        <SearchIcon
          width="35"
          className="fill-[#393939] hover:fill-[#FEFEFE] disabled:fill-[#CACACA]"
        />
      </button>
    </Flex>
  )
}

export default SearchInput
