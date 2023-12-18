'use client'

import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/design-system'
import { Channel, Reference } from '@/gql'
import { unixTimeConverter } from '@/utils'
import { ItemDropdown, ThumbnailNameCreator } from '@/client'

function extractContentType({
  reference,
  metadata,
}: { reference: any; metadata: any }) {
  const referenceMetadata = metadata.data[reference.pubRef?.uri as string]
  return referenceMetadata?.contentType
    ? referenceMetadata.contentType
    : 'undefined'
}

export function ItemsListWeb({
  channel,
  metadata,
}: { channel: Channel; metadata: any }) {
  return (
    <div className="px-5">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="hidden md:table-cell w-[10px] pr-4">
              <Typography variant="small" className="text-secondary-foreground">
                #
              </Typography>
            </TableHead>
            <TableHead>
              <Typography variant="small" className="text-secondary-foreground">
                Item
              </Typography>
            </TableHead>
            <TableHead className="hidden md:table-cell text-right">
              <Typography variant="small" className="text-secondary-foreground">
                Type
              </Typography>
            </TableHead>
            <TableHead className="hidden md:table-cell text-right">
              <Typography variant="small" className="text-secondary-foreground">
                Date added
              </Typography>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {channel.references.map((reference: Reference, index: number) => (
            <TableRow key={index}>
              <TableCell className="hidden md:table-cell text-left text-primary-foreground pr-2">
                <Typography>{index + 1}</Typography>
              </TableCell>
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
              <TableCell className="text-right w-[100px] text-primary-foreground">
                <ItemDropdown
                  targetChannelId={channel.id}
                  targetReferenceId={reference.id}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
