import Image from 'next/image';
import Link from 'next/link';
import { Body, Card, BodySmall, Stack, cn } from '@river/design-system';
import { truncateText } from '../../utils';
import { Listing } from '../../gql/sdk.generated';
import { extractAddressFromListingId } from '../../utils';

export function ListingCard({
  listing,
  className,
}: {
  listing: Listing;
  className?: string;
}) {
  return (
    <Stack className={cn('gap-y-2', className)}>
      {/* Image */}
      <Card className='relative'>
        <Link
          href={`${extractAddressFromListingId(listing.id)}/${listing.id.slice(
            44
          )}`}
        >
          <Image
            className='object-cover aspect-square'
            src={listing?.listingTargetMetadata?.pieceThumbnail as string}
            alt={listing?.listingTargetMetadata?.pieceName as string}
            fill
          />
        </Link>
      </Card>
      {/* Caption */}
      <Stack className='max-w-[224px]'>
        <Link
          href={`${extractAddressFromListingId(listing.id)}/${listing.id.slice(
            44
          )}`}
        >
          <Body className='text-label font-medium leading-[14px] hover:underline'>
            {truncateText(
              listing?.listingTargetMetadata?.pieceName as string,
              30
            )}
          </Body>
        </Link>
        <BodySmall className='text-label-muted cursor-default'>
          {truncateText(
            listing?.listingTargetMetadata?.pieceCreator as string,
            20
          )}
        </BodySmall>
      </Stack>
    </Stack>
  );
}
