import React, { useState, useCallback } from 'react'
import SearchGallery from './SearchGallery'
import SearchInput from './SearchInput'
import { Nft } from 'alchemy-sdk'
import { useSendData } from '@/hooks'
import {
  Hex,
  Hash,
  encodeAbiParameters,
  parseAbiParameters,
  zeroAddress,
  isAddress,
  getAddress,
} from 'viem'
import { Stack, Button } from '@river/estuary'
import { type Listing } from '../../../../types/types'
import { usePathname, useRouter } from 'next/navigation'
import { MerkleProof } from 'hooks/useIsAdminOrInTree'

interface SearchContainerProps {
  isAdmin: boolean
  setAdminStatus: React.Dispatch<React.SetStateAction<boolean | null>>
  merkleProof?: MerkleProof | null
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SearchContainer({
  isAdmin,
  setAdminStatus,
  merkleProof,
  setOpen,
}: SearchContainerProps)  {

  const [searchParams, setSearchParams] = useState<Listing>({
    chainId: BigInt(0),
    tokenId: BigInt(0),
    listingAddress: zeroAddress,
    hasTokenId: true,
  })
  const [searchResults, setSearchResults] = useState<Nft | undefined>()

  const pathname = usePathname()
  const cleanedPathname = getAddress(pathname.slice(9))
  const router = useRouter()

  const handleSetSearchParams = useCallback(
    (updatedParams: {
      network?: number | undefined
      contractAddress?: string | undefined
      tokenId?: string | undefined
    }) => {
      setSearchParams((prev) => ({
        ...prev,
        chainId: updatedParams.network
          ? BigInt(updatedParams.network)
          : prev.chainId,
        listingAddress: (updatedParams.contractAddress ||
          prev.listingAddress) as Hex,
        tokenId: updatedParams.tokenId
          ? BigInt(updatedParams.tokenId)
          : prev.tokenId,
      }))
    },
    [],
  )

  const proofArray = (merkleProof?.proof as Hash[]) || []

  const sendInputs: Hash = encodeAbiParameters(
    parseAbiParameters('bytes32[], (uint128, uint128, address, bool)[]'),
    [
      proofArray,
      [
        [
          searchParams.chainId,
          searchParams.tokenId,
          isAddress(searchParams.listingAddress as Hex)
            ? (searchParams.listingAddress as Hex)
            : zeroAddress,
          searchParams.hasTokenId as boolean,
        ],
      ],
    ],
  )

  const { sendDataConfig, sendData, sendDataLoading, sendDataSuccess } =
    useSendData({
      press: cleanedPathname,
      data: sendInputs,
      value: '0.0005',
      prepareTxn: !!searchResults,
      successCallback: () => {
        router.refresh()
        setOpen(false)
      },
    })

    return (
      <Stack className="justify-center gap-4">
        <SearchGallery nftMetadata={searchResults} />
        <Stack className="w-full gap-y-4 p-4 pt-0">
          <SearchInput
            searchResults={searchResults}
            setSearchResults={setSearchResults}
            setSearchParams={handleSetSearchParams}
          />
          <Button
            loading={sendDataLoading}
            disabled={!sendData}
            onClick={() => sendData?.()}
            className="w-full"
            variant="secondary"
          >
            {searchResults?.title ? `Add "${searchResults?.title}"` : 'Add'}
          </Button>
        </Stack>
      </Stack>
    )
  }