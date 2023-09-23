import React, { useState } from "react";
import SearchGallery from "./SearchGallery";
import SearchInput from "./SearchInput";
import SearchAction from "./SearchAction";
import { Nft } from "alchemy-sdk";
import { useSendData } from "@/hooks";
import {
  Hex,
  Hash,
  encodeAbiParameters,
  parseAbiParameters,
  zeroAddress,
  isAddress,
  getAddress,
} from "viem";
import { useAccount } from "wagmi";
import { Stack } from "@river/estuary";
import { type Listing } from "../../../../types/types";
import { usePathname, useRouter } from "next/navigation";

interface SearchContainerProps {
  isAdmin: boolean;
  setAdminStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SearchContainer({
  isAdmin,
  setAdminStatus,
}: SearchContainerProps) {
  const [searchParams, setSearchParams] = useState<Listing>({
    chainId: BigInt(0),
    tokenId: BigInt(0),
    listingAddress: zeroAddress,
    hasTokenId: true,
  });
  const [searchResults, setSearchResults] = useState<Nft | undefined>();

  const pathname = usePathname();
  const cleanedPathname = getAddress(pathname.slice(9));
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
      listingAddress: (updatedParams.contractAddress ||
        prev.listingAddress) as Hex,
      tokenId: updatedParams.tokenId
        ? BigInt(updatedParams.tokenId)
        : prev.tokenId,
    }));
  };

  const sendInputs: Hash = encodeAbiParameters(
    parseAbiParameters("bytes32[], (uint128, uint128, address, bool)[]"),
    [
      [],
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
    ]
  );

  const { sendDataConfig, sendData, sendDataLoading, sendDataSuccess } =
    useSendData({
      press: cleanedPathname,
      data: sendInputs,
      value: "0.0005",
      prepareTxn: searchResults ? true : false,
      successCallback: router.refresh,
    });

  return (
    <>
  
        <Stack className="justify-center gap-4">
          <SearchGallery nftMetadata={searchResults} />
          <Stack className="gap-y-4 mx-[18px]">
            <SearchInput
              searchResults={searchResults}
              setSearchResults={setSearchResults}
              setSearchParams={handleSetSearchParams}
            />
          <SearchAction
            nameOfAdd={searchResults?.title}
            addReady={isAdmin || !!sendDataConfig ? true : false}
            addTrigger={sendData}
          />
          </Stack>
        </Stack>

    </>
  );
}
