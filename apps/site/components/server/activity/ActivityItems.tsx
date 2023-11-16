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

export async function ActivityItems({
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
              Recent activity
            </Typography>
          </TableHead>
          <TableHead className="text-right">
            <Typography variant="smallText" className="text-[#747474]">
              Added to
            </Typography>
          </TableHead>
          <TableHead className="text-right">
            <Typography variant="smallText" className="text-[#747474]">
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
              {item.name}
            </TableCell>
            <TableCell className="text-right">{item.creator}</TableCell>
            <TableCell className="text-right">{item.added}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
