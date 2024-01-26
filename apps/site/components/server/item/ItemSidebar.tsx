import { Typography, Stack, Flex } from '@/design-system'
import { type Reference } from '@/gql'
import { getUsername } from '@/lib'
import { unixTimeConverter } from '@/utils'

interface ItemSidebarProps {
  contentUrl: string
  reference: Reference
  itemMetadata: {
    name: string
    description: string
    image: string
    animationUri: string
    contentType: string
    muxAssetId?: string | undefined
    muxPlaybackId?: string | undefined
  } | null
}

export async function ItemSidebar({
  contentUrl,
  reference,
  itemMetadata,
}: ItemSidebarProps) {
  const username = await getUsername({ id: reference?.pubRef?.createdBy })

  return (
    <Stack className="px-5 py-[10px] h-full justify-between fixed">
      {/* Info / Index */}
      <div>
        <Flex className="gap-x-4 items-center">
          <Typography>Info</Typography>
          <Typography className="text-secondary-foreground">Index</Typography>
        </Flex>
        <Stack className="pt-[30px] gap-y-5">
          <div>
            <Typography>{itemMetadata?.name}</Typography>
            <Typography className="text-secondary-foreground">
              {username}
            </Typography>
          </div>
          <Typography>{'--'}</Typography>
        </Stack>
        <Stack className="pt-[45px] gap-y-[3px]">
          <Flex className="justify-between">
            <Typography>Added to</Typography>
            <Typography className="text-secondary-foreground">
              {reference.channelId}
            </Typography>
          </Flex>
          <Flex className="justify-between">
            <Typography>Added by</Typography>
            <Typography className="text-secondary-foreground">
              {username}
            </Typography>
          </Flex>
          <Flex className="justify-between">
            <Typography>Date added</Typography>
            <Typography className="text-secondary-foreground">
              {unixTimeConverter(reference.createdTimestamp)}
            </Typography>
          </Flex>
          <Flex className="justify-between">
            <Typography>Kind</Typography>
            <Typography className="text-secondary-foreground">
              {itemMetadata?.contentType}
            </Typography>
          </Flex>
          <Flex className="justify-between">
            <Typography>Content hash</Typography>
            <Typography className="text-secondary-foreground truncate">
              {/* imageMetadata?.animationUri */}
              {truncateMiddle(itemMetadata?.image as string)}
            </Typography>
          </Flex>
        </Stack>
      </div>
      {/* Add / Download */}
      <Flex className="justify-between">
        <Typography>Add to channel</Typography>
        <Typography>Download</Typography>
      </Flex>
    </Stack>
  )
}

export function truncateMiddle(str: string, ellipsis = '...'): string {
  const frontChars = 5
  const backChars = 5
  if (str.length <= frontChars + backChars) {
    return str
  }
  const start = str.substring(0, frontChars)
  const end = str.substring(str.length - backChars)
  return `${start}${ellipsis}${end}`
}
