import Image from 'next/image';
import { Body, BodySmall, Flex } from '@river/design-system';
import { cn } from '@river/design-system/src/utils';

export interface Channel {
  name: string;
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
    <div className={cn('space-y-[8px]', className)} {...props}>
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
        <Body className='text-'>{channel.name}</Body>
        <BodySmall className='text-sonic-silver'>{channel.creator}</BodySmall>
      </Flex>
    </div>
  );
}
