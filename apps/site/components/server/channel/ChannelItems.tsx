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
import { Channel, Item } from '@/gql'
import { unixTimeConverter, ipfsToHttps } from '@/utils'
import { Username } from '@/server'
import Image from 'next/image'

  // const { name, description, image  } = await getChannelUriContents({
  //   uri: channel.uri
  // })

  const mockUriContentsObject: {
    name: string,
    description: string,
    image: string
  } = {
    name: "YesandNo",
    description: "Imeannnnnnn",
    image: "ipfs://bafkreiamfxbkndyuwkw4kutjcfcitozbtzrvqneryab2njltiopsfjwt6a"
  }

export async function ChannelItems({ channel }: { channel: Channel }) {

  console.log("what are the channel items: ", channel)


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
              <Image
                className="object-cover aspect-square "
                // src={ipfsToHttps(item.targetMetadata?.imageUri as string)}
                // alt={item.targetMetadata?.name as string}
                src={ipfsToHttps(mockUriContentsObject.image)}
                alt={mockUriContentsObject.name}                
                width={40}
                height={40}
              />
              <Stack className="">
                <Typography className="text-primary-foreground">
                  {/* {item.targetMetadata?.name} */}
                  {mockUriContentsObject.name}
                </Typography>
                <Username id={item.creatorId} />
                {/* <Typography className="text-secondary-foreground">
                {`user id: ` + item.userId}
              </Typography> */}
              </Stack>
            </TableCell>
            <TableCell className="text-right text-primary-foreground">
              <Typography>{'** type **'}</Typography>
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
