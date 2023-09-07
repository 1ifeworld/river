import Image from 'next/image';
import Link from 'next/link';
import { Body, Card, BodySmall, Stack, cn } from '@river/design-system';
import { type ListingExtended } from '../../types/types';
import { truncateText } from '../../utils';

export function ListingCard({
  extendedListing,
  className,
}: {
  extendedListing: ListingExtended;
  className?: string;
}) {
  return (
    <Stack className={cn('gap-y-2', className)}>
      {/* Image */}
      <Card>
        <Link href={extendedListing.listingAddress}>
          <Image
            src={
              extendedListing?.listingTargetMetadata?.pieceImageURL as string
            }
            alt={extendedListing?.listingTargetMetadata?.pieceName as string}
            width={224}
            height={224}
          />
        </Link>
      </Card>
      {/* Caption */}
      <Stack className='max-w-[224px]'>
        <Body className='text-label font-medium leading-none'>
          {extendedListing?.listingTargetMetadata?.pieceName}
        </Body>
        <BodySmall className='text-label-muted'>
          {truncateText(extendedListing?.createdBy, 30)}
        </BodySmall>
      </Stack>
    </Stack>
  );
}
