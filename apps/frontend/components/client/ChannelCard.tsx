import Image from 'next/image';
import { Body, Card, BodySmall, Stack, cn } from '@river/design-system';
import { type Channel } from '../../types/types';

export function ChannelCard({
  channel,
  className,
}: {
  channel: Channel;
  className: string;
}) {
  return (
    <Stack className={cn('gap-y-2', className)}>
      {/* Image */}
      <Card>
        <Image src={channel.cover} alt={channel.name} />
      </Card>
      {/* Caption */}
      <Stack>
        <Body className='text-label font-medium'>{channel.name}</Body>
        {channel.members ? (
          <BodySmall className='text-labelMuted'>
            {channel.creator} + {channel.members.length} others
          </BodySmall>
        ) : (
          <BodySmall className='text-labelMuted'>{channel.creator}</BodySmall>
        )}
      </Stack>
    </Stack>
  );
}
