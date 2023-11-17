import { Typography } from '@/design-system'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/design-system'

// This is a placeholder component to represent a cover image
const WhiteBox = () => {
  return (
    <div className="border-muted-foreground border-[.2px] bg-white w-10 h-10" />
  )
}

export async function ChannelItems({
  user,
}: {
  /* biome-ignore lint: */
  user: any
}) {
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead>
            <Typography variant="h1">Recent activity</Typography>
          </TableHead>
          <TableHead className="text-right">
            <Typography variant="small" className="text-secondary-foreground">
              Added to
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
        {/* biome-ignore lint: */}
        {user.items.map((item: any) => (
          <TableRow key={item.id}>
            <TableCell className="flex gap-2 items-center">
              <WhiteBox />
              <Typography>{item.name}</Typography>
            </TableCell>
            <TableCell className="text-right">
              <Typography>{item.creator}</Typography>
            </TableCell>
            <TableCell className="text-right">
              <Typography>{item.added}</Typography>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
