import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/design-system'
import { Channel, Item } from '@/gql'
import { unixTimeConverter } from '@/utils'
import { ThumbnailNameCreator } from '@/server'

function extractContentType({ item, metadata }: { item: any; metadata: any }) {
  const itemMetadata = metadata.data[item.target?.publication?.uri as string]
  return itemMetadata.contentType
}

export async function ChannelItems({
  channel,
  metadata,
}: { channel: Channel; metadata: any }) {
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[10px]">
            <Typography variant="small" className="text-secondary-foreground">
              #
            </Typography>
          </TableHead>
          <TableHead>
            <Typography variant="small" className="text-secondary-foreground">
              Item
            </Typography>
          </TableHead>
          <TableHead className="text-right">
            <Typography variant="small" className="text-secondary-foreground">
              Type
            </Typography>
          </TableHead>
          <TableHead className="text-right">
            <Typography variant="small" className="text-secondary-foreground">
              Date added
            </Typography>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {channel.items.map((item: Item, index: number) => (
          <TableRow key={index}>
            <TableCell className="text-right text-primary-foreground">
              <Typography>{index + 1}</Typography>
            </TableCell>
            <TableCell className="flex gap-4 items-center text-primary-foreground">
              <ThumbnailNameCreator
                channel={channel}
                item={item}
                metadata={metadata}
              />
            </TableCell>
            <TableCell className="text-right text-primary-foreground">
              <Typography>{`${extractContentType({
                item: item,
                metadata: metadata,
              })}`}</Typography>
            </TableCell>
            <TableCell className="text-right text-primary-foreground">
              <Typography>{unixTimeConverter(item.timestamp)}</Typography>
            </TableCell>
            <TableCell className="text-right w-[100px] text-primary-foreground">
              <Typography>{'...'}</Typography>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
