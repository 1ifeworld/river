import {
  Typography,
  Table,
  TableBody,
  TableCell,
} from "@/design-system";
import { Channel, Reference } from "@/gql";
import { unixTimeConverter } from "@/utils";
import { ThumbnailNameCreator } from "@/server";
import { ItemDropdown } from "@/client";
import Link from "next/link";

function extractContentType({
  reference,
  metadata,
}: {
  reference: any;
  metadata: any;
}) {
  const referenceMetadata = metadata.data[reference.pubRef?.uri as string];
  return referenceMetadata?.contentType
    ? referenceMetadata.contentType
    : "undefined";
}

export async function ChannelItems({
  channel,
  metadata,
}: {
  channel: Channel;
  metadata: any;
}) {
  return (
    <div className="px-[14px] md:px-0 md:pr-5 pt-5 w-full">
      <Table className="w-full">
        <TableBody>
          {channel.references.map((reference: Reference, index: number) => (
            <Link
              className=" table-row hover:bg-divider hover:cursor-pointer"
              key={index}
              href={`/item/${reference.id}`}
            >
              <TableCell className="flex gap-4 items-center text-primary-foreground">
                <ThumbnailNameCreator
                  channel={channel}
                  reference={reference}
                  metadata={metadata}
                />
              </TableCell>
              <TableCell className="hidden md:table-cell text-right text-primary-foreground">
                <Typography>{`${extractContentType({
                  reference: reference,
                  metadata: metadata,
                })}`}</Typography>
              </TableCell>
              <TableCell className="hidden md:table-cell text-right text-primary-foreground">
                <Typography>
                  {unixTimeConverter(reference.createdTimestamp)}
                </Typography>
              </TableCell>
              <TableCell className="text-right w-fit md:w-[100px] text-primary-foreground">
                <ItemDropdown
                  targetChannelId={channel.id}
                  targetReferenceId={reference.id}
                />
              </TableCell>
            </Link>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
