import { Body, Headline, Stack } from '@river/design-system';

export function ListingDetails({ listing }: { listing: any }) {
  return (
    <Stack className='p-6 gap-4'>
      <span className='inline-block pb-2'>
        <Headline>{listing?.listingTargetMetadata?.pieceName}</Headline>
        <Body className='text-label-muted'>
          {listing?.listingTargetMetadata?.pieceCreator}
        </Body>
      </span>
      <span className='inline-block'>
        <Body className='text-label'>
          {listing?.listingTargetMetadata?.pieceDescription}
        </Body>
      </span>
    </Stack>
  );
}
