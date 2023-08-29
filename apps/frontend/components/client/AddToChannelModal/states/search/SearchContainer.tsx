"use client";

// SearchContainer.tsx
import React, {useState} from 'react';
import SearchGallery from './SearchGallery';
import SearchInput from './SearchInput';
import SearchAction from './SearchAction';
import { Nft } from 'alchemy-sdk';
import { useSendData } from '../../../../../hooks';
import { Hex, Hash, encodeAbiParameters, parseAbiParameters, zeroAddress, isAddress } from 'viem';

interface Listing {
    chainId: bigint,
    tokenId: bigint,
    listingAddress: Hex,
    hasTokenId: boolean
}



const SearchContainer = () => {
    const [searchParams, setSearchParams] = useState<Listing>({
        chainId: BigInt(0),
        tokenId: BigInt(0),
        listingAddress: zeroAddress,
        hasTokenId: true
    })
    const [searchResults, setSearchResults] = useState<Nft | undefined>();
    console.log("search results in container: ", searchResults)

    const handleSetSearchParams = (updatedParams: {
        network?: number;
        contractAddress?: Hex;
        tokenId?: string;
    }) => {
        setSearchParams((prev) => ({
            ...prev,
            chainId: updatedParams.network ? BigInt(updatedParams.network) : prev.chainId,
            listingAddress: updatedParams.contractAddress || prev.listingAddress,
            tokenId: updatedParams.tokenId ? BigInt(updatedParams.tokenId) : prev.tokenId,
        }));
    };    

    /* sendData Hook */

    const sendInputs: Hash = encodeAbiParameters(
        parseAbiParameters(
            'bytes32[], (uint128, uint128, address, bool)[]'
        ),
        [
            // outer brackets to define as array
            [],
            [ // outer brackets to define as array
                [ // additional outer brackets to define as struct
                    searchParams.chainId,
                    searchParams.tokenId,
                    isAddress(searchParams.listingAddress) ? searchParams.listingAddress : zeroAddress,
                    searchParams.hasTokenId
                ]
            ]
        ]
    )

    const {
        sendDataConfig,
        sendData,
        sendDataLoading,
        sendDataSuccess
    } = useSendData({
        press: "0x5A2AfcD3aA9B1445A49f0bc8f9c11bFe3DA391de",
        data: sendInputs,
        // data: "0x00000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000076adf1000000000000000000000000000000000000000000000000000000000000001100000000000000000000000000000000000000000000000000000000077777770000000000000000000000000000000000000000000000000000000000000001",
        value: "0.0005",
        prepareTxn: searchResults ? true : false
    })


    // 0x8823d2240000000000000000000000005a2afcd3aa9b1445a49f0bc8f9c11bfe3da391de0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000012000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000076adf1000000000000000000000000000000000000000000000000000000000000001100000000000000000000000000000000000000000000000000000000077777770000000000000000000000000000000000000000000000000000000000000001

    console.log("config: ", sendDataConfig)

  return (
    <div className='flex flex-wrap justify-center'>
      <SearchGallery nftMetadata={searchResults} />
      <SearchInput 
        searchResults={searchResults} 
        setSearchResults={setSearchResults} 
        setSearchParams={handleSetSearchParams}
    />
      <SearchAction addReady={!!sendDataConfig ? true : false} addTrigger={sendData} />
    </div>
  );
};

export default SearchContainer;