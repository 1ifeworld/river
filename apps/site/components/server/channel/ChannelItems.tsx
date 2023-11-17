import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/design-system";
import { ChannelWithHashQuery, Item } from "@/gql";

// This is a placeholder component to represent a cover image
const WhiteBox = () => {
  return (
    <div className="border-muted-foreground border-[.2px] bg-white w-10 h-10" />
  );
};

export async function ChannelItems({ channel }: { channel: ChannelWithHashQuery }) {
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead>
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
      {/* <TableBody>        
        {channel.items.map((item: Item, index: number) => (
          <TableRow key={index}>
            TableCell className="flex gap-2 items-center">
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
        ))}
      </TableBody> */}
    </Table>
  );
}
