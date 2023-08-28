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

/* <ContextMenuContent className="w-40">
  <ContextMenuItem>Add to Library</ContextMenuItem>
  <ContextMenuSub>
    <ContextMenuSubTrigger>Add to Playlist</ContextMenuSubTrigger>
    <ContextMenuSubContent className="w-48">
      <ContextMenuItem>
        <PlusCircledIcon className="mr-2 h-4 w-4" />
        New Playlist
      </ContextMenuItem>
      <ContextMenuSeparator />
      {playlists.map((playlist) => (
        <ContextMenuItem key={playlist}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="mr-2 h-4 w-4"
            viewBox="0 0 24 24"
          >
            <path d="M21 15V6M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM12 12H3M16 6H3M12 18H3" />
          </svg>
          {playlist}
        </ContextMenuItem>
      ))}
    </ContextMenuSubContent>
  </ContextMenuSub>
  <ContextMenuSeparator />
  <ContextMenuItem>Play Next</ContextMenuItem>
  <ContextMenuItem>Play Later</ContextMenuItem>
  <ContextMenuItem>Create Station</ContextMenuItem>
  <ContextMenuSeparator />
  <ContextMenuItem>Like</ContextMenuItem>
  <ContextMenuItem>Share</ContextMenuItem>
</ContextMenuContent> */
