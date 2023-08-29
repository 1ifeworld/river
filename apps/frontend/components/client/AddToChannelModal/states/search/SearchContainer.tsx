"use client";

// SearchContainer.tsx
import React, {useState} from 'react';
import SearchGallery from './SearchGallery';
import SearchInput from './SearchInput';
import SearchAction from './SearchAction';
import { Nft } from 'alchemy-sdk';
import { useSendData } from '../../../../../hooks';

const SearchContainer = () => {
    const [searchResults, setSearchResults] = useState<Nft | undefined>();
    console.log("search results in container: ", searchResults)

    // const {
    //     sendDataConfig,
    //     sendData,
    //     sendDataLoading,
    //     sendDataSuccess
    // } = useSendData({
    //     press: "0x5A2AfcD3aA9B1445A49f0bc8f9c11bFe3DA391de",
    //     data: "0x00000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000076adf1000000000000000000000000000000000000000000000000000000000000001100000000000000000000000000000000000000000000000000000000077777770000000000000000000000000000000000000000000000000000000000000001",
    //     value: "500000000000000",
    //     prepareTxn: searchResults ? true : false
    // })

  return (
    <div className='flex flex-wrap justify-center'>
      {/* <SearchGallery nftMetadata={searchResults} />
      <SearchInput searchResults={searchResults} setSearchResults={setSearchResults} />
      <SearchAction addReady={!!sendDataConfig ? true : false} addTrigger={sendData} /> */}
    </div>
  );
};

export default SearchContainer;