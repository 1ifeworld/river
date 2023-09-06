import Image from 'next/image';
import { Body, Card, BodySmall, Flex, cn } from '@river/design-system';
import { type Channel } from '../../types/types';

interface ChannelCardProps extends React.HTMLAttributes<HTMLDivElement> {
  channel: Channel;
  width?: number;
}

export function ChannelCard({
  channel, // channel data object
  width, // aspect ratio is defaulted to square, so just provide width measurement
  className,
  ...props
}: ChannelCardProps) {
  return (
    <Flex className={cn('flex-col gap-y-2', className)} {...props}>
      <Card>
        <Image
          src={channel.cover}
          alt={channel.name}
          // width={width}
          // height={width}
          className={cn('h-auto w-auto object-cover aspect-square')}
        />
      </Card>

      <Flex className='flex-col'>
        <Body className='text-label font-medium leading-none'>
          {channel.name}
        </Body>
        {channel.members ? (
          <BodySmall className='text-labelMuted'>
            {channel.creator} + {channel.members.length} others
          </BodySmall>
        ) : (
          <BodySmall className='text-labelMuted'>{channel.creator}</BodySmall>
        )}
      </Flex>
    </Flex>
  );
}
