import { ItemDropdown } from "@/client";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@/design-system";
import { Channel, Adds, Item } from "@/gql";
import { ThumbnailNameCreator } from "@/server";
import { unixTimeConverter } from "@/utils";
import Link from "next/link";
import styles from "./ChannelItems.module.css";

function extractContentType({ item, metadata }: { item: Item; metadata: any }) {
  if (!item || !item.uri) return undefined;
  const itemMetadata = metadata.data[item.uri];
  return itemMetadata?.contentType ? itemMetadata.contentType : "undefined";
}

export async function ChannelItems({
  channel,
  metadata,
}: {
  channel: Channel;
  metadata: any;
}) {
  const totalItems = channel.adds?.items?.length ?? 0;

  return (
    <Table className="md:ml-2">
      <TableBody>
        {channel?.adds?.items?.map((add: Adds, index: number) => (
          add.removed ? null : (
          <TableRow>
            <TableCell className="flex gap-4 items-center">
              <Link
                key={index}
                href={`/channel/${add.channelId}/${totalItems - index}`}
                className="flex gap-4 items-center"
                // legacyBehavior
              >
                <ThumbnailNameCreator
                  channel={channel}
                  item={add.item}
                  metadata={metadata}
                />
              </Link>
            </TableCell>

            {/* This component is hidden on small screens */}
            <TableCell className="hidden md:table-cell max-w-[118px] text-primary-foreground text-nowrap truncate pr-12">
              <Typography>{`${extractContentType({
                item: add?.item,
                metadata: metadata,
              })}`}</Typography>
            </TableCell>
            {/* This component is hidden on small screens */}
            <TableCell className="hidden md:table-cell text-primary-foreground text-nowrap truncate">
              <Typography>
                {unixTimeConverter(Number(add.item.timestamp))}
              </Typography>
            </TableCell>
            <TableCell className="text-right w-fit md:w-[100px] text-primary-foreground">
              <ItemDropdown itemRemovedIndex={index} itemRemoved={add.removed ? add.removed : false } channelCid={channel.id} itemCid={add.itemId} />
            </TableCell>
          </TableRow>
          )
        ))}
      </TableBody>
    </Table>
  );
}
