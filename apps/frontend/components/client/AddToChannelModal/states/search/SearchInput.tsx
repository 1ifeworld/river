"use client";

import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@river/design-system/src/components/Select";
import { SearchIcon } from "@river/design-system";
import { Input } from "@river/design-system/src/components/Input";
import { Label } from "@river/design-system/src/components/Label";

import { networks } from "../../../../../constants";
import useGetTokenMetadata from "../../../../../hooks/useGetTokenMetadata";
import { Nft } from "alchemy-sdk";
import { Hex } from "viem";

interface NetworkSelectProps {
  selectedNetwork: number;
  setSelectedNetwork: React.Dispatch<React.SetStateAction<number>>;
}

const getIconPath = (networkId: number) => {
  const networkName = networks[networkId];
  return networkName ? `/icons/${networkName}.svg` : ""; // default to empty string if no match.
};

function NetworkSelect({
  selectedNetwork,
  setSelectedNetwork,
}: NetworkSelectProps) {
  return (
    <Select onValueChange={(value) => setSelectedNetwork(Number(value))}>
      <SelectTrigger
        id="networkSelect"
        className="w-[70px] h-[40px] px-2 border-[1.5px] border-[#DADADA] focus:outline-none"
      >
        <SelectValue>
          <img
            src={getIconPath(selectedNetwork)}
            width={14}
            height={24}
            alt={networks[selectedNetwork] + " icon"}
            className=""
          />
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {Object.entries(networks).map(([networkId, networkName]) => (
          <SelectItem key={networkId} value={networkId}>
            <div className="flex items-center border-[1.5px] border-[#DADADA] px-2">
              <img
                src={getIconPath(Number(networkId))}
                alt={`${networkName} icon`}
                className="w-[14px] h-[24px] mr-2"
              />
              {networkName}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

type SearchInputProps = {
  searchResults: Nft | undefined;
  setSearchResults: React.Dispatch<React.SetStateAction<Nft | undefined>>;
  setSearchParams: (params: {
    network?: number;
    contractAddress?: string;
    tokenId?: string;
  }) => void;
};

const SearchInput = ({
  searchResults,
  setSearchResults,
  setSearchParams,
}: SearchInputProps) => {
  // Change the initial state and state type to number instead of string | null
  const [network, setNetwork] = useState<number>(1); // defaulting to Ethereum's ID
  const [contractAddress, setContractAddress] = useState<string>("");
  const [tokenId, setTokenId] = useState<string>("");

  const { tokenMetadata, fetchMetadata } = useGetTokenMetadata({
    network: network,
    address: contractAddress,
    tokenId: tokenId,
  });

  // trigger target metadata fetch
  const handleFetchMetadata = () => {
    fetchMetadata();
  };

  useEffect(() => {
    if (tokenMetadata) {
      setSearchResults(tokenMetadata);
    }
  }, [tokenMetadata]);

  useEffect(() => {
    setSearchParams({
      network,
      contractAddress,
      tokenId,
    });
  }, [network, contractAddress, tokenId]);

  return (
    <div className="flex w-fit h-fit justify-start items-center border-[1px] border-red-500 ">
      <div className="flex flex-col gap-y-[5px]">
        <Label htmlFor="networkSelect" className="text-[#7B7B7B] w-fit ml-2 text-[10px]" id="networkSelect">
          Network
        </Label>
        <NetworkSelect
          selectedNetwork={network}
          setSelectedNetwork={setNetwork}
        />
      </div>
      <div className="flex flex-col gap-y-[5px]">
        <Label htmlFor="addressInput" className="text-[#7B7B7B] ml-2 w-fit text-[10px]">
          Address
        </Label>
        <Input
          id="addressInput"
          type="text"
          placeholder="0xA7b..."
          value={contractAddress}
          onChange={(e) => setTokenId(e.target.value)}
          className="px-2 w-[274px] h-[40px] border-[1.5px] border-l-0 border-[#DADADA] focus:outline-none"
        />
      </div>
      <div className="flex flex-col gap-y-[5px]">
        <Label htmlFor="tokenIdInput" className="ml-2 text-[#7B7B7B] w-fit text-[10px]">
          ID
        </Label>
        <Input
          id="tokenIdInput"
          type="text"
          placeholder="17"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
          className="px-2 w-[40px] h-[40px] border-[1.5px] border-l-0 border-[#DADADA] focus:outline-none"
        />
      </div>
      <div className="flex flex-col gap-y-[5px] justify-center">
        <Label htmlFor="" className="text-white w-fit text-[10px]">
          Search
        </Label>
        <button
          className="ml-[12px] flex h-full self-center rounded-full bg-[#F2F2F2] hover:bg-[#A8A8A8] disabled:bg-[#F2F2F2]"
          onClick={() => {
            // Handle the search here using network, contractAddress, and tokenId
            handleFetchMetadata();
          }}
        >
          <SearchIcon
            width="35"
            className="fill-[#393939] hover:fill-[#FEFEFE] disabled:fill-[#CACACA]"
          />
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
