import { ItemDropdown } from '@/client'
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@/design-system'
import type { Adds, Channel, Item } from '@/gql'
import { ItemCard, ThumbnailNameCreator } from '@/server'
import { unixTimeConverter } from '@/utils'
import Link from 'next/link'
import styles from './ChannelItems.module.css'

// biome-ignore lint:
function extractContentType({ item, metadata }: { item: Item; metadata: any }) {
  if (!item || !item.uri) return undefined
  const itemMetadata = metadata.data[item.uri]
  return itemMetadata?.contentType ? itemMetadata.contentType : 'undefined'
}

export async function ChannelItems({
  channel,
  metadata,
  view,
}: {
  channel: Channel
  // biome-ignore lint:
  metadata: any
  view?: string | string[]
}) {
  const totalItems = channel.adds?.items?.length ?? 0

  if (view === 'list') {
    return (
      <Table className="md:ml-2">
        <TableBody>
          {channel?.adds?.items?.map((add: Adds, index: number) =>
            add.removed ? null : (
              <TableRow className={`${styles.tableRow}`} key={add.timestamp}>
                <Link
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
                  <ItemDropdown channel={channel} add={add} item={add.item} />
                </TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
    )
  }
  return (
    <Grid className="grid-cols-2 md:grid-cols-[repeat(auto-fill,_minmax(255px,_1fr))] gap-5 pb-[30px] md:ml-2">
      {channel?.adds?.items?.map((add: Adds) =>
        add.removed ? null : (
          <ItemCard
            key={add.timestamp}
            add={add}
            dropdownComponent={
              <ItemDropdown channel={channel} add={add} item={add.item} />
            }
          />
        ),
      )}
    </Grid>
  )
}
