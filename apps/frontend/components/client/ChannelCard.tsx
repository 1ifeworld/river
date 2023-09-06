import Image from 'next/image';
import { Body, BodySmall, Flex, cn } from '@river/design-system';

export interface Channel {
  name: string;
  description?: string;
  creator: string;
  members?: string[];
  cover: string;
}

interface ChannelCardProps extends React.HTMLAttributes<HTMLDivElement> {
  channel: Channel;
  width?: number;
}

/*
  NOTE: 
  I believe should become a server component
  Once we have the data streaming into app correctly
*/

export function ChannelCard({
  channel, // channel data object
  width, // aspect ratio is defaulted to square, so just provide width measurement
  className,
  ...props
}: ChannelCardProps) {
  return (
    <Flex className={cn('flex-col gap-y-2', className)} {...props}>
      <div className='overflow-hidden rounded'>
        <Image
          src={channel.cover}
          alt={channel.name}
          width={width}
          height={width}
          className={cn('h-auto w-auto object-cover aspect-square')}
        />
      </div>
      <Flex className='flex-col'>
        <Body className='text-labelBase font-medium leading-none'>{channel.name}</Body>
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
