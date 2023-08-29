"use client";

// SearchGallery.tsx
import React from "react";
import { Nft } from "alchemy-sdk";
import Image from "next/image";
import { cn } from "@river/design-system/src/utils";

interface NetworkSelectProps {
  nftMetadata: Nft | undefined;
}

const SearchGallery = ({ nftMetadata }: NetworkSelectProps) => {
  console.log("nft metadata in search gallery: ", nftMetadata);
  return (
    <div className="w-full h-[220px] bg-[#E0E0E0] flex items-center">
      {/* Grid container */}
      <div className="flex-grow grid grid-cols-2  px-4">
        {/* First Column: Image or Blank Square */}
        <div className="flex w-fit h-full items-center bg-[#D0D0D0]">
          {nftMetadata?.media?.[0]?.thumbnail ? (
            <Image
              src={nftMetadata?.media?.[0]?.thumbnail}
              alt={nftMetadata?.title}
              width={165}
              height={165}
              className={cn(
                "border-2 border-black object-cover aspect-square"
              )}
            />
          ) : (
            // Your custom div component for the null state goes here
            <div className="w-[165px] h-[165px]"></div>
          )}
        </div>
        {/* Second Column: Text details */}
        <div className="flex flex-col justify-between">
            <div>
                <span className="text-[17px] text-[#272727]">
                    {nftMetadata?.title || "Title Placeholder"}
                </span>
                <br/>
                <span className="text-[13px] text-[#777777]">
                    {nftMetadata?.contract.contractDeployer || "Created By Placeholder"}
                </span>
            </div>
            <span className="text-[13px] text-[#777777]">
                {nftMetadata?.description || "Description Placeholder"}
            </span>
        </div>
      </div>
    </div>
  );
};

{
  /* <div className="w-full h-[220px] bg-[#E0E0E0]">
{nftMetadata ? (
  <img src={nftMetadata.media[0].thumbnail} alt={nftMetadata.title || "NFT"} />
) : (
  "yo" // Placeholder content or UI components for empty state
)}
</div> */
}

export default SearchGallery;
