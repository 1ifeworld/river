import { Flex, cn, Body, BodySmall } from '@river/design-system';
import Image from 'next/image';
import { shortenAddress } from '../../utils/shortenAddress';

function truncateText(text: string, maxLength: number) {
  if (!text) return ''; // Return an empty string if text is undefined
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function ChannelBody({ listings }: { listings: any }) {
  if (!listings || listings.length === 0) {
    return <div>No Listings available.</div>;
  }
  return (
    <Flex className='gap-x-10'>
      <div className={`grid grid-cols-6 gap-x-[21px] gap-y-[18px] pb-4`}>
        {listings.map((listing: any, index: number) => (
          <Flex className={cn('flex-col gap-y-2')}>
            <div id={listing.id} className='overflow-hidden rounded'>
              <Image
                src={
                  listing?.listingTargetMetadata?.pieceImageURL
                    ? listing?.listingTargetMetadata?.pieceImageURL
                    : ''
                }
                alt={listing?.listingTargetMetadata?.pieceName}
                width={224}
                height={224}
                className={cn('object-cover aspect-square')}
              />
            </div>
            <Flex className='flex-col'>
              <Body className='text-labelBase font-medium leading-none'>
                {truncateText(listing?.listingTargetMetadata?.pieceName, 30)}
              </Body>
              <BodySmall className='text-labelMuted'>
                {shortenAddress(listing?.listingTargetMetadata?.pieceCreator)}
              </BodySmall>
            </Flex>
          </Flex>
        ))}
      </div>
    </Flex>
  );
}
