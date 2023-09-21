import React from 'react'
import { Nft } from 'alchemy-sdk'
import Image from 'next/image'
import { cn } from '@river/estuary/src/utils'
import { Body, Stack, Flex } from '@river/estuary'
import { Hex, zeroAddress } from 'viem'
import { useGetAddressDisplay } from '@/hooks'

interface NetworkSelectProps {
  nftMetadata: Nft | undefined
}

const SearchGallery = ({ nftMetadata }: NetworkSelectProps) => {
  const { display } = useGetAddressDisplay(
    nftMetadata?.contract.contractDeployer
      ? (nftMetadata?.contract.contractDeployer as Hex)
      : zeroAddress,
  )
  return (
    <div className="w-full h-[218px] bg-base-shade border-y-[0.5px] border-base-border flex items-center p-4">
      {/* Grid container */}
      <Flex className="justify-start items-center w-full space-x-5">
        {/* First Column: Image or Blank Square */}
        <div className="flex justify-center w-fit">
          {nftMetadata?.media?.[0]?.thumbnail ? (
            <Image
              src={nftMetadata?.media?.[0]?.thumbnail}
              alt={nftMetadata?.title}
              width={200}
              height={200}
              className={cn(
                'rounded min-w-[164px] min-h-[164px] object-cover aspect-square',
              )}
            />
          ) : (
            <div className="w-[164px] h-[164px] bg-base-border" />
          )}
        </div>
        {/* Second Column: Text details */}
        <Stack className="gap-4 max-w-prose">
          <span>
            <Body className="text-label break-words">
              {nftMetadata?.title || 'Title'}
            </Body>
            {/* truncating for now but need to add ens resolution */}
            <Body className="text-label-muted break-words truncate">
              {display || 'Created By'}
            </Body>
          </span>
          <Body className="text-label-muted break-words">
            {nftMetadata?.description || 'Description' || 'Description'}
          </Body>
        </Stack>
      </Flex>
    </div>
  )
}

export default SearchGallery
