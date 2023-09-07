import React from "react";
import { Flex, Body, BodySmall } from "@river/design-system";
import Image from "next/image";
import { truncateText, shortenAddress } from "../../utils";
import { ListingRenderer } from ".";

type ListingViewProps = {
  listings: any[]; // You can replace 'any' with the actual type of your listings
  error?: string;
};

export function ListingView({ listings, error }: ListingViewProps) {
  // If there's an error, display the error message
  if (error) {
    return <Flex className="flex-col">{error}</Flex>;
  }

  // If no listings are available, display a message
  if (!listings || listings.length === 0) {
    return (
      <Flex className="flex-col">
        No listings found for the provided listingId
      </Flex>
    );
  }

  // If listings are still being fetched, display a loading message
  if (!listings) {
    return <Flex className="flex-col">Loading...</Flex>;
  }

  const mediaURL: string = listings?.[0]?.listingTargetMetadata?.pieceImageURL
    ? listings?.[0]?.listingTargetMetadata?.pieceImageURL
    : "";

  // Render the listing
  return (
    <Flex className="w-full h-full justify-center">
      <ListingRenderer mediaURL={mediaURL} />
    </Flex>
  );
}
