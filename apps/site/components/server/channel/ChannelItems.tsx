import { Typography, Table, TableBody, TableCell, TableRow, Stack, Button, Flex } from '@/design-system'
import { Channel, Reference } from '@/gql'
import { unixTimeConverter } from '@/utils'
import { ThumbnailNameCreator } from '@/server'
import { ItemDropdown } from '@/client'
import Link from 'next/link'

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

function WhiteSquare(){
  return (
    <Flex className="gap-4 items-center">
    <Stack className="w-10 h-10 bg-background border border-border justify-center items-center hover:bg-primary/[0.025] transition-all">
      <Typography variant="h1">
      +
      </Typography>
      </Stack>
      <Button variant="link">
        Add an item
    </Button>
    </Flex>
  )
}


export async function ChannelItems({
  channel,
  metadata,
}: {
  channel: Channel
  metadata: any
}) {
  return (
    // <div className="px-[14px] md:px-0 md:pr-5 pt-5 w-full">
      <Table className="w-full">
        <TableBody>
          <WhiteSquare />
          {channel.references.map((reference: Reference, index: number) => (
            // <Link
            //   className=" table-row hover:bg-divider hover:cursor-pointer transition-all"
            //   key={index}
            //   href={`/item/${reference.id}`}
            // >
            <TableRow>
              <TableCell className="flex gap-4 items-center text-primary-foreground">
                <ThumbnailNameCreator
                  channel={channel}
                  reference={reference}
                  metadata={metadata}
                />
              </TableCell>
              <TableCell className="hidden md:table-cell text-right text-primary-foreground">
                <Typography>{`${extractContentType({
                  reference: reference,
                  metadata: metadata,
                })}`}</Typography>
              </TableCell>
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
            // </Link>
          ))}
        </TableBody>
      </Table>
    // </div>
  )
}
