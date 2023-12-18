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

export function ItemsListMobile({
  channel,
  metadata,
}: { channel: Channel; metadata: any }) {
  return (
    <div className="px-[14px]">
      <Table className="w-full">
        <TableBody>
          {channel.references.map((reference: Reference, index: number) => (
            <TableRow key={index}>
              <TableCell className="flex gap-4 items-center text-primary-foreground">
                <ThumbnailNameCreator
                  channel={channel}
                  reference={reference}
                  metadata={metadata}
                />
              </TableCell>
              <TableCell className="text-right w-fit text-primary-foreground">
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
