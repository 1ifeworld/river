import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Stack,
} from '@/design-system'
import { ChannelWithHashQuery, Item } from '@/gql'

// This is a placeholder component to represent a cover image
const WhiteBox = () => {
  return (
    <div className="border-muted-foreground border-[.2px] bg-white w-10 h-10" />
  )
}

export async function ChannelItems({
  channel,
}: { channel: ChannelWithHashQuery }) {
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
        <TableRow key={'1'}>
          <TableCell className="text-right text-primary-foreground">
            <Typography>{'1'}</Typography>
          </TableCell>
          <TableCell className="flex gap-4 items-center text-primary-foreground">
            <WhiteBox />
            <Stack className="">
              <Typography className="text-primary-foreground">
                {'name'}
              </Typography>
              <Typography className="text-secondary-foreground">
                {'creator'}
              </Typography>
            </Stack>
          </TableCell>
          <TableCell className="text-right text-primary-foreground">
            <Typography>{'PNG image'}</Typography>
          </TableCell>
          <TableCell className="text-right text-primary-foreground">
            <Typography>{'2 days ago'}</Typography>
          </TableCell>
          <TableCell className="text-right w-[100px] text-primary-foreground">
            <Typography>{'...'}</Typography>
          </TableCell>
        </TableRow>
        {/* {channel.channels[0].items.map((item: any, index: number) => (
          <TableRow key={index}>
            <TableCell className="flex gap-2 items-center">
              <Typography>{index.toString()}</Typography>
            </TableCell>
            <TableCell className="flex gap-2 items-center">
              <WhiteBox />
              <Typography>{item.target}</Typography>
            </TableCell>
            <TableCell className="text-right">
              <Typography>{item.target}</Typography>
            </TableCell>
            <TableCell className="text-right">
              <Typography>{item.target}</Typography>
            </TableCell>
          </TableRow>
        ))} */}
      </TableBody>
    </Table>
  )
}
