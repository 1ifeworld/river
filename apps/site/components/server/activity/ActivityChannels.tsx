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

export async function ActivityChannels({
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
            <Typography variant="h1">Channels</Typography>
          </TableHead>
          <TableHead className="text-right">
            <Typography variant="small" className="text-secondary-foreground">
              Creator
            </Typography>
          </TableHead>
          <TableHead className="text-right w-[200px]">
            <Typography variant="small" className="text-secondary-foreground">
              Date modified
            </Typography>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* biome-ignore lint: */}
        {user.channels.map((channel: any) => (
          <TableRow key={channel.id}>
            <TableCell className="flex gap-2 items-center">
              <WhiteBox />
              <Typography>{channel.name}</Typography>
            </TableCell>
            <TableCell className="text-right">
              <Typography>{channel.creator}</Typography>
            </TableCell>
            <TableCell className="text-right">
              <Typography>{channel.modified}</Typography>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
