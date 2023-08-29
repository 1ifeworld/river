import Image from "next/image";

import { cn } from "@river/design-system/src/utils";

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
    <div className={cn("space-y-[8px]", className)} {...props}>
  
          <div className="overflow-hidden rounded-[4px]">
            <Image
              src={channel.cover}
              alt={channel.name}
              width={width}
              height={width}
              className={cn(
                "h-auto w-auto object-cover transition-all hover:scale-105 aspect-square"
              )}
            />
          </div>
       
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{channel.name}</h3>
        <p className="text-xs text-muted-foreground">{channel.creator}</p>
      </div>
    </div>
  );
}
