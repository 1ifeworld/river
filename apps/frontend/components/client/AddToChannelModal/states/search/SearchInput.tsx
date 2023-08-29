"use client";

// SearchInput.tsx
import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@river/design-system/src/components/Select";
import { networks } from "../../../../../constants";
import useGetTokenMetadata from "../../../../../hooks/useGetTokenMetadata";
import { Nft } from "alchemy-sdk";

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
      <SelectTrigger className="w-fit h-full">
        <SelectValue>
          <img
            src={getIconPath(selectedNetwork)}
            alt={networks[selectedNetwork] + " icon"}
            className="w-5 h-5 mr-2"
          />
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {Object.entries(networks).map(([networkId, networkName]) => (
          <SelectItem key={networkId} value={networkId}>
            <div className="flex items-center">
              {" "}
              {/* Wrap in a flex container */}
              <img
                src={getIconPath(Number(networkId))}
                alt={`${networkName} icon`}
                className="w-5 h-5 mr-2"
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
};

const SearchInput = ({ searchResults, setSearchResults }: SearchInputProps) => {
  // Change the initial state and state type to number instead of string | null
  const [network, setNetwork] = useState<number>(1); // defaulting to Ethereum's ID
  const [contractAddress, setContractAddress] = useState<string>("");
  const [tokenId, setTokenId] = useState<string>("");

  const { tokenMetadata, fetchMetadata } = useGetTokenMetadata({
    network: network,
    address: contractAddress,
    tokenId: tokenId,
  });

  console.log("network: ", network);
  console.log("contractAddress: ", contractAddress);
  console.log("tokenId: ", tokenId);

  console.log("search results in input compo: ", searchResults);

  const handleFetchMetadata = () => {
    // trigger metadata fetch
    fetchMetadata();
  };

    // if tokenMetadata exists, set results to tokenMetadata

  useEffect(() => {
    if (tokenMetadata) {
      setSearchResults(tokenMetadata);
    }
  }, [tokenMetadata]);

  return (
    <div className="flex items-center w-full my-2">
      <div className="flex-1">{/* Placeholder for the dropdown */}</div>
      <NetworkSelect
        selectedNetwork={network}
        setSelectedNetwork={setNetwork}
      />
      <input
        type="text"
        placeholder="0xA7b..."
        className="flex-2 mx-2 p-1 border"
        value={contractAddress}
        onChange={(e) => setContractAddress(e.target.value)}
      />
      <input
        type="text"
        placeholder="17"
        className="flex-1 mx-2 p-1 border"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
      />
      <button
        className="flex-none w-12 mx-2 p-1 border"
        onClick={() => {
          // Handle the search here using network, contractAddress, and tokenId
          handleFetchMetadata();
        }}
      >
        Select
      </button>
    </div>
  );
};

export default SearchInput;
