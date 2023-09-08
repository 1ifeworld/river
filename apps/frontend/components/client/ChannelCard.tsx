import Image from 'next/image';
import Link from 'next/link';
import { Body, Card, BodySmall, Stack, cn } from '@river/design-system';
import { type Channel, type ContractUri } from '../../types/types';
import { truncateText, removeFirstTwo } from '../../utils';

export function ChannelCard({
  channel,
  contractUri,
  className,
}: {
  channel: Channel;
  contractUri: ContractUri;
  className?: string;
}) {
  return (
    <Stack className={cn('gap-y-2', className)}>
      {/* Image */}
      <Card>
        <Link href={removeFirstTwo(channel.id)}>
          <Image
            src={contractUri?.image}
            alt={contractUri.name}
            width={224}
            height={224}
          />
        </Link>
      </Card>
      {/* Caption */}
      <Stack className='max-w-[224px]'>
        <Body className='text-label font-medium leading-none'>
          {contractUri.name}
        </Body>
        {channel.logicTransmitterMerkleAdmin.accounts ? (
          <BodySmall className='text-label-muted'>
            {truncateText(channel?.createdBy, 30)} + {channel.logicTransmitterMerkleAdmin.accounts}{' '}
            others
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
