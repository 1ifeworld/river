"use client";

import Image from "next/image";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@river/design-system/src/components/EntityCard";
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
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="overflow-hidden rounded-[4px]">
            <Image
              src={channel.cover}
              alt={channel.name}
              width={width}
              height={width}
              className={cn(
                "h-auto w-auto object-cover transition-all aspect-square"
              )}
            />
          </div>
        </ContextMenuTrigger>
      </ContextMenu>
      <div className="space-y-[1px] text-sm">
        <h3 className="text-[13px] text-[#262626] leading-none">{channel.name}</h3>
        <p className="text-xs text-[#777777] text-muted-foreground">{channel.creator}</p>
      </div>
    </div>
  );
}
