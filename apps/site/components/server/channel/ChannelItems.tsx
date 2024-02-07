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
        {channel?.adds?.items?.map((add: Adds, index: number) =>
          add.removed ? null : (
            <TableRow className={`${styles.tableRow}`}>
              <Link
                key={`/${index}-tnc`}
                href={`/channel/${add.channelId}/${totalItems - index}`}
                legacyBehavior
              >
                <TableCell className="flex gap-4 items-center hover:cursor-pointer">
                  <ThumbnailNameCreator item={add.item} metadata={metadata} />
                </TableCell>
              </Link>

              {/* This component is hidden on small screens */}        
              <Link
                key={`/${index}-cont`}
                href={`/channel/${add.channelId}/${totalItems - index}`}
                legacyBehavior
              >
              <TableCell className="hidden md:table-cell max-w-[118px] text-primary-foreground text-nowrap truncate pr-12 hover:cursor-pointer">
                <Typography>{`${extractContentType({
                  item: add?.item,
                  metadata: metadata,
                })}`}</Typography>
              </TableCell>
              </Link>

              {/* This component is hidden on small screens */}
              <Link
                key={`/${index}-time`}
                href={`/channel/${add.channelId}/${totalItems - index}`}
                legacyBehavior
              >         
              <TableCell className="hidden md:table-cell text-primary-foreground text-nowrap truncate hover:cursor-pointer">
                <Typography>
                  {unixTimeConverter(Number(add.item.timestamp))}
                </Typography>
              </TableCell>
              </Link>
              <TableCell className="text-right text-primary-foreground z-40">
                <ItemDropdown
                  channel={channel}
                  add={add}
                />
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
}
