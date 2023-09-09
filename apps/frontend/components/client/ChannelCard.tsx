import Image from 'next/image';
import Link from 'next/link';
import { Body, Card, BodySmall, Stack, cn } from '@river/design-system';
import { Channel } from '../../gql/sdk.generated';
import { truncateText } from '../../utils';
import { ipfsToHttps } from '../../utils';

export function ChannelCard({
  channel,
  className,
}: {
  channel: Channel;
  className?: string;
}) {
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
        <Link href={`channel/${channel.id}`}>
          <Body className='text-label font-medium leading-[14px] hover:underline'>
            {channel.contractUri?.name}
          </Body>
        </Link>
        {channel.logicTransmitterMerkleAdmin[0].accounts ? (
          <BodySmall className='text-label-muted'>
            {truncateText(channel?.createdBy, 20)} +{' '}
            {channel.logicTransmitterMerkleAdmin[0].accounts.length - 1} others
          </BodySmall>
        ) : (
          <BodySmall className='text-label-muted'>
            {truncateText(channel.createdBy, 30)}
          </BodySmall>
        )}
      </Stack>
    </Stack>
  );
}
