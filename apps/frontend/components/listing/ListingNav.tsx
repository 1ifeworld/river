import React from "react";
import { RightPointer, Flex, Body } from "@river/design-system";
import { getChannel } from "../../gql/requests/getChannel";
import { getAddress } from "viem";
import { extractAddressFromListingId } from "../../utils";

type ListingNavProps = {
  listing: any; // You can replace 'any' with the actual type of your listings
};

export async function ListingNav({ listing }: ListingNavProps) {
  const { channels } = await getChannel({
    channel: getAddress(extractAddressFromListingId(listing.id)) as string,
  });

  return (
    <Flex className="pl-[15px] items-center w-full h-[5%] border-b gap-x-[8px] border-base-border">
      <Body className="text-label-muted">
        {channels?.[0].contractUri?.name}
      </Body>
      <RightPointer />
      <Body className="text-label">{listing.listingTargetMetadata.pieceName}</Body>
    </Flex>
  );
}
