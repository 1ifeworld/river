'use client'

import { Flex, cn, Body, BodySmall } from '@river/design-system';
import Image from 'next/image';
import { shortenAddress, truncateText } from '../../utils';
import { type ListingExtended } from '../../types/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Listing } from '../../gql/sdk.generated';
import { Hex } from 'viem';

export function ChannelBody({ listings }: { listings: Listing[]}) {
  const pathname = usePathname()
  if (!listings || listings.length === 0) {
    return <div>No Listings available.</div>;
  }

  return (
    <Flex className='gap-x-10'>
      <div className={`grid grid-cols-6 gap-x-[21px] gap-y-[18px] pb-4`}>
        {listings.map((listing: Listing, index: number) => (
          <Flex className={cn('flex-col gap-y-2')}>
            {/* TO DO FIX ROUTING IN THE LINK COMPONENT ???*/}
            <Link href={`${pathname}/${listings[index].id.slice(44)}`} >
              <div id={listing.id} className='overflow-hidden rounded'>
                <Image
                  src={
                    listing?.listingTargetMetadata?.pieceImageURL
                      ? listing?.listingTargetMetadata?.pieceImageURL
                      : ''
                  }
                  alt={listing?.listingTargetMetadata?.pieceName || ''}
                  width={224}
                  height={224}
                  className={cn('object-cover aspect-square')}
                />
              </div>
            </Link>
            <Flex className='flex-col'>
              <Body className='text-labelBase font-medium leading-none'>
                {truncateText(listing?.listingTargetMetadata?.pieceName as string, 30)}
              </Body>
              <BodySmall className='text-label-muted'>
                {(listing?.listingTargetMetadata?.pieceCreator)}
              </BodySmall>
            </Flex>
          </Flex>
        ))}
      </div>
    </Flex>
  );
}
