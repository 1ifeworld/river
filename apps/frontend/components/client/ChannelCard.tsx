import Image from 'next/image';
import Link from 'next/link';
import { Body, Card, BodySmall, Stack, cn } from '@river/design-system';
import { type Channel } from '../../types/types';
import { truncateText, removeFirstTwo } from '../../utils';

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
      <Card>
        <Link href={removeFirstTwo(channel.id)}>
          <Image
            src={channel.cover}
            alt={channel.name}
            width={224}
            height={224}
          />
        </Link>
      </Card>
      {/* Caption */}
      <Stack className='max-w-[224px]'>
        <Body className='text-label font-medium leading-none'>
          {channel.name}
        </Body>
        {channel.members ? (
          <BodySmall className='text-label-muted'>
            {truncateText(channel.creator, 30)} + {channel.members.length}{' '}
            others
          </BodySmall>
        ) : (
          <BodySmall className='text-label-muted'>
            {truncateText(channel.creator, 30)}
          </BodySmall>
        )}
      </Stack>
    </Stack>
  );
}
