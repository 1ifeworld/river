import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Debug,
} from '@/design-system'
import { Channel, Reference } from '@/gql'
import { unixTimeConverter } from '@/utils'
import { ThumbnailNameCreator } from '@/server'
import { ItemDropdown } from '@/client'
import Link from 'next/link'
import styles from './ChannelItems.module.css'

function extractContentType({
  reference,
  metadata,
}: {
  reference: any
  metadata: any
}) {
  const referenceMetadata = metadata.data[reference.pubRef?.uri as string]
  return referenceMetadata?.contentType
    ? referenceMetadata.contentType
    : 'undefined'
}

export async function ChannelItems({
  channel,
  metadata,
}: {
  channel: Channel
  metadata: any
}) {
  return (
    <Table className="flex-grow md:overflow-auto md:ml-2">
      <TableBody>
        {channel.references.map((reference: Reference, index: number) => (
          <Link key={index} href={`/item/${reference.id}`} legacyBehavior>
            <TableRow className={`${styles.tableRow} hover:cursor-pointer`}>
              <TableCell className="flex gap-4 items-center">
                <ThumbnailNameCreator
                  channel={channel}
                  reference={reference}
                  metadata={metadata}
                />
              </TableCell>
              {/* This component is hidden on small screens */}
              <TableCell className="hidden md:table-cell text-right text-primary-foreground">
                <Typography>{`${extractContentType({
                  reference: reference,
                  metadata: metadata,
                })}`}</Typography>
              </TableCell>
              {/* This component is hidden on small screens */}
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
            </TableRow>
          </Link>
        ))}
      </TableBody>
    </Table>
  )
}
