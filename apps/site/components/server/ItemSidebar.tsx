import { AddToChannelDialog, IndexInfoToggle } from '@/client'
import {
  Flex,
  Stack,
  Typography,
  Public,
  Button,
  Separator,
} from '@/design-system'
import type { Adds, Channel, ChannelRoles } from '@/gql'
import { getAddsMetadata, ipfsUrlToCid } from '@/lib'
import { ThumbnailNameCreator, Username } from '@/server'
import { unixTimeConverter } from '@/utils'
import Link from 'next/link'
import { USER_ID_ZERO } from '@/constants'

interface ItemContext extends Adds {
  adds: Adds[]
}

interface ItemSidebarProps {
  itemContext: ItemContext
  itemMetadata: {
    name: string
    description: string
    image: string
    animationUri: string
    contentType: string
  } | null
  view?: string | string[]
}

export function ItemSidebar({
  itemContext,
  itemMetadata,
  view,
}: ItemSidebarProps) {
  function checkIsPublic({ roleData }: { roleData: ChannelRoles[] }) {
    for (let i = 0; i < roleData.length; ++i) {
      if (roleData[i].rid === USER_ID_ZERO && roleData[i].role > 0) return true
    }
    return false
  }

  const isPublic = !itemContext?.channel?.roles?.items
    ? false
    : checkIsPublic({ roleData: itemContext?.channel?.roles?.items })

  const indexLength = itemContext?.channel.addsCounter ?? 0

  // next index means going backwards in time in term of when items were added to channel (smaller = older)
  // ex: channel index 47, clicking next would take u to item 46 which was added before 47
  let nextIndex = itemContext.channelIndex - 1
  while (
    nextIndex > 0 &&
    itemContext.adds[indexLength - nextIndex].removed === true
  ) {
    nextIndex = nextIndex - 1
  }
  const invalidNext = nextIndex === 0

  let prevIndex = Number(itemContext.channelIndex) + 1
  while (
    prevIndex < indexLength &&
    itemContext.adds[indexLength - prevIndex].removed === true
  ) {
    prevIndex++
  }
  const invalidPrev = prevIndex > indexLength

  return (
    <Stack className="p-5 h-[320px] md:h-full border-t border-border md:border-none">
      <Flex className="justify-between items-center pb-[30px]">
        <Typography>Info</Typography>
        <Flex className="gap-x-2">
          <Button variant="link" disabled={invalidPrev}>
            <Link href={`/channel/${itemContext.channel.id}/${prevIndex}`}>
              <Typography>Prev</Typography>
            </Link>
          </Button>
          <Button variant="link" disabled={invalidNext}>
            <Link href={`/channel/${itemContext.channel.id}/${nextIndex}`}>
              <Typography>Next</Typography>
            </Link>
          </Button>
        </Flex>
        {/* <IndexInfoToggle /> */}
        {/* <Link
          href={`/channel/${itemContext.channelId}`}
          className="underline-offset-2 transition-all hover:underline"
        >
          <Typography>Go to channel</Typography>
        </Link> */}
      </Flex>
      <Stack className="justify-between md:justify-start">
        <Stack className="gap-y-5">
          <div>
            <Typography className="truncate">{itemMetadata?.name}</Typography>
            <Username id={itemContext.item.createdById} />
          </div>
          <Typography>{'--'}</Typography>
        </Stack>
        <Stack className=" gap-y-[7px] pt-5 md:pt-[45px]">
          <Flex className="justify-between">
            <Typography>Channel</Typography>
            <Flex className="items-center space-x-[6px]">
              <Link
                href={`/channel/${itemContext.channel.id}`}
                className="hover:underline underline-offset-2 transition-all decoration-secondary-foreground"
              >
                <Typography className="text-secondary-foreground">
                  {itemContext.channel.name}
                </Typography>
              </Link>
              {isPublic && <Public />}
            </Flex>
          </Flex>
          <Flex className="justify-between">
            <Typography>Added by</Typography>
            <Username id={itemContext.addedById} />
          </Flex>
          <Flex className="justify-between">
            <Typography>Date added</Typography>
            <Typography className="text-secondary-foreground">
              {unixTimeConverter(itemContext.timestamp)}
            </Typography>
          </Flex>
          <Flex className="justify-between">
            <Typography>Type</Typography>
            <Typography className="text-secondary-foreground">
              {itemMetadata?.contentType}
            </Typography>
          </Flex>
        </Stack>
      </Stack>

      <Flex className="py-[30px]">
        <AddToChannelDialog item={itemContext.item} />
      </Flex>

      {/* <Separator /> */}
      <Flex className="py-[30px]">
        <Typography>{`Index [${
          indexLength - itemContext.channelIndex + 1
        }/${indexLength}]`}</Typography>
      </Flex>

      <ItemIndex itemContext={itemContext} />
    </Stack>
  )
}

async function ItemIndex({ itemContext }: { itemContext: ItemContext }) {
  // @ts-ignore
  // const { metadata } = await getAddsMetadata(channel?.adds?.items)
  const { metadata } = await getAddsMetadata(itemContext.adds)
  return (
    <div className="md:overflow-x-hidden">
      {itemContext.adds.map((add: Adds, index: number) =>
        add.removed ? null : (
          <Link
            key={index}
            href={`/channel/${add.channelId}/${add.channelIndex}`}
          >
            <Flex className="gap-4 py-[5px] items-center hover:cursor-pointer">
              <ThumbnailNameCreator
                item={add.item}
                metadata={metadata}
                truncation={30}
              />
            </Flex>
          </Link>
        ),
      )}
    </div>
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
