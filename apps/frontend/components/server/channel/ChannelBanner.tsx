import {
  Flex,
  cn,
  Body,
  Card,
  Headline,
  BodyLarge,
} from '@river/design-system';
import Image from 'next/image';
import { ChannelModal } from '../../client/AddToChannelModal';
import { Hex } from 'viem';
import { Channel } from '../../../gql/sdk.generated';
import { ipfsToHttps, shortenAddress, getAddressDisplay } from '../../../utils';

export async function ChannelBanner({ channels }: { channels: Channel }) {

    // Attempt to resolve relevant address/ens before component renders
    const creatorEnsOrAddress = await getAddressDisplay(channels?.createdBy as Hex)


  return (
    <Flex className='gap-x-10 h-[248px]'>
      <Card size='lg' className='relative'>
        <Image
          className='object-cover aspect-square'
          src={ipfsToHttps(channels?.contractUri?.image as string)}
          alt={
            channels?.contractUri?.name
              ? channels?.contractUri?.name
              : 'Channel name missing'
          }
          fill
        />
      </Card>
      {/* Channel settings */}
      {/* Second Column: Text details */}
      <Flex className='h-full flex-col justify-between cursor-default'>
        <div></div>
        <div className=''>
          <Headline className='font-medium text-label'>
            {channels?.contractUri?.name
              ? channels?.contractUri?.name
              : 'Channel name missing'}
          </Headline>
          <BodyLarge className='text-label-muted'>
            {creatorEnsOrAddress}
            {channels?.logicTransmitterMerkleAdmin[0].accounts?.length
              ? ` + ${
                  channels.logicTransmitterMerkleAdmin[0].accounts.length - 1
                } others`
              : ''}
          </BodyLarge>
          <Body className='text-label-muted'>
            {channels?.contractUri?.description
              ? channels?.contractUri?.description
              : ''}
          </Body>
        </div>
        <ChannelModal />
      </Flex>
    </Flex>
  );
}
