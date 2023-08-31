import React, { useState, useEffect } from 'react';
import SearchGallery from './SearchGallery';
import SearchInput from './SearchInput';
import SearchAction from './SearchAction';
import { Nft } from 'alchemy-sdk';
import { useSendData } from '../../../../../hooks';
import {
  Hex,
  Hash,
  encodeAbiParameters,
  parseAbiParameters,
  zeroAddress,
  isAddress,
} from 'viem';
import { Debug, Flex } from '@river/design-system';
import { useRouter } from 'next/navigation';

interface Listing {
  chainId: bigint;
  tokenId: bigint;
  listingAddress: string;
  hasTokenId: boolean;
}

export function SearchContainer() {
  const [searchParams, setSearchParams] = useState<Listing>({
    chainId: BigInt(0),
    tokenId: BigInt(0),
    listingAddress: zeroAddress,
    hasTokenId: true,
  });
  const [searchResults, setSearchResults] = useState<Nft | undefined>();
  const router = useRouter();

  const handleSetSearchParams = (updatedParams: {
    network?: number | undefined;
    contractAddress?: string | undefined;
    tokenId?: string | undefined;
  }) => {
    setSearchParams((prev) => ({
      ...prev,
      chainId: updatedParams.network
        ? BigInt(updatedParams.network)
        : prev.chainId,
      listingAddress: updatedParams.contractAddress || prev.listingAddress,
      tokenId: updatedParams.tokenId
        ? BigInt(updatedParams.tokenId)
        : prev.tokenId,
    }));
  };

  /* sendData Hook */
  const sendInputs: Hash = encodeAbiParameters(
    parseAbiParameters('bytes32[], (uint128, uint128, address, bool)[]'),
    [
      // outer brackets to define as array
      [],
      [
        // outer brackets to define as array
        [
          // additional outer brackets to define as struct
          searchParams.chainId,
          searchParams.tokenId,
          isAddress(searchParams.listingAddress)
            ? searchParams.listingAddress
            : zeroAddress,
          searchParams.hasTokenId,
        ],
      ],
    ]
  );

  const { sendDataConfig, sendData, sendDataLoading, sendDataSuccess } =
    useSendData({
      // TODO: update press input to come from custom routing
      press: '0x5A2AfcD3aA9B1445A49f0bc8f9c11bFe3DA391de',
      data: sendInputs,
      value: '0.0005',
      prepareTxn: searchResults ? true : false,
    });

  useEffect(() => {
    router.refresh();
  }, [sendDataSuccess]);

  console.log('sendDataSuccess', sendDataSuccess);

  return (
    <Flex className='flex-col justify-center gap-4'>
      <SearchGallery nftMetadata={searchResults} />
      <Flex className='flex-col gap-y-4 mx-[18px]'>
        <SearchInput
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          setSearchParams={handleSetSearchParams}
        />
        <SearchAction
          nameOfAdd={searchResults?.title}
          addReady={!!sendDataConfig ? true : false}
          addTrigger={sendData}
        />
      </Flex>
    </Flex>
  );
}
