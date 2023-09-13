import Image from 'next/image';
import Link from 'next/link';
import {
  Body,
  Card,
  BodySmall,
  Stack,
  cn,
  Flex,
  C,
} from '@river/design-system';
import { Channel } from '../../gql/sdk.generated';
import { truncateText, ipfsToHttps } from '../../utils';
import { useGetAddressDisplay } from '../../hooks/useGetAddressDisplay';
import { Hex } from 'viem';

export function ChannelCard({
  channel,
  className,
}: {
  channel: Channel;
  className?: string;
}) {
  // Run useGetAddress hook on page load. Add in the display lag so that the cards dont jump 
  // in place initially before display has fetched a value. always show at least the address,
  // and correct it to the ens. This should be replaced by a server side solution
  const { display } = useGetAddressDisplay(channel.createdBy as Hex)
  const frontEndDisplayLagFix = display ? display : channel.createdBy as Hex  
  return (
    <Stack className={cn('gap-y-2', className)}>
      {/* Image */}
      <Link href={`channel/${channel.id}`}>
        <Card className='relative'>
          <Image
            className='object-cover aspect-square'
            src={ipfsToHttps(channel.contractUri?.image as string)}
            alt={channel.contractUri?.name as string}
            fill
          />
        </Card>
      </Link>
      {/* Caption */}
      <Stack className='max-w-[224px]'>
        <Flex className='justify-between items-center'>
          <Link href={`channel/${channel.id}`}>
            <Body className='text-label font-medium leading-[14px] hover:underline'>
            {truncateText(channel.contractUri?.name ?? '', 20)}
            </Body>
          </Link>
          <C />
        </Flex>        
        {channel?.logicTransmitterMerkleAdmin[0].accounts?.length as number > 1? (
          <BodySmall className='text-label-muted cursor-default'>
            {truncateText(frontEndDisplayLagFix, 20)} +{' '}
            {channel?.logicTransmitterMerkleAdmin[0].accounts?.length as number - 1} others
          </BodySmall>
        ) : (
          <BodySmall className='text-label-muted cursor-default'>
            {truncateText(frontEndDisplayLagFix, 30)}
          </BodySmall>
        )}
      </Stack>
    </Stack>
  );
}
