import React from 'react';
import { Flex, Stack } from '@river/design-system';
import { MediaRenderer, MediaContainer, ListingNav } from '.';
import { Listing } from '../../../gql/sdk.generated';
import { ListingDetails } from './ListingDetails';

type ListingViewProps = {
  listings: Listing[];
  error?: string;
};

export function ListingView({ listings, error }: ListingViewProps) {
  // If there's an error, display the error message
  if (error) {
    return <Flex className='flex-col'>{error}</Flex>;
  }

  // If no listings are available, display a message
  if (!listings || listings.length === 0) {
    return (
      <Flex className='flex-col'>
        No listings found for the provided listingId
      </Flex>
    );
  }

  // If listings are still being fetched, display a loading message
  if (!listings) {
    return <Flex className='flex-col'>Loading...</Flex>;
  }

  const mediaURL: string = listings?.[0]?.listingTargetMetadata?.pieceFullRes
    ? listings?.[0]?.listingTargetMetadata?.pieceFullRes
    : '';

  return (
    <Stack className='w-full'>
      <ListingNav listing={listings?.[0]} />
      <MediaContainer>
        <MediaRenderer mediaURL={mediaURL} />
      </MediaContainer>
      <ListingDetails listing={listings?.[0]} />
    </Stack>
  );
}
