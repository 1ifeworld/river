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
  return <div className="border-gray-200 border-2 bg-white w-10 h-10" />
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
            <Typography variant="smallText" className="text-[#414141]">
              Channels
            </Typography>
          </TableHead>
          <TableHead className="text-right">
            <Typography variant="smallText" className="text-[#747474]">
              Creator
            </Typography>
          </TableHead>
          <TableHead className="text-right">
            <Typography variant="smallText" className="text-[#747474]">
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
              {channel.name}
            </TableCell>
            <TableCell className="text-right">{channel.creator}</TableCell>
            <TableCell className="text-right">{channel.modified}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
