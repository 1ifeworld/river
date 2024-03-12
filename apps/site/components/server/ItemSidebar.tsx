import { IndexInfoToggle } from '@/client'
import { Flex, Stack, Typography } from '@/design-system'
import type { Adds, Channel } from '@/gql'
import { getAddsMetadata, ipfsUrlToCid } from '@/lib'
import { ThumbnailNameCreator, Username } from '@/server'
import { unixTimeConverter } from '@/utils'
import Link from 'next/link'

interface ItemSidebarProps {
  itemContext: Adds
  itemMetadata: {
    name: string
    description: string
    image: string
    animationUri: string
    contentType: string
  } | null
  channel: Channel
  view?: string | string[]
}

export function ItemSidebar({
  itemContext,
  itemMetadata,
  channel,
  view,
}: ItemSidebarProps) {
  return (
    <Stack className="p-5 h-[320px] md:h-full border-t border-border md:border-none">
      <Flex className="justify-between items-center pb-[30px]">
        <IndexInfoToggle />
        <Link
          href={`/channel/${itemContext.channelId}`}
          className="underline-offset-2 transition-all hover:underline"
        >
          <Typography>Go to channel</Typography>
        </Link>
      </Flex>
      {view === 'info' ? (
        <Stack className="justify-between h-full md:justify-start">
          <Stack className="gap-y-5">
            <div>
              <Typography className="truncate">{itemMetadata?.name}</Typography>
              <Username id={itemContext.item.createdById} />
            </div>
            <Typography>{'--'}</Typography>
          </Stack>
          <Stack className="gap-y-[7px] md:pt-[45px]">
            <Flex className="justify-between">
              <Typography>Added to</Typography>
              <Link
                href={`/channel/${itemContext.channelId}`}
                className="hover:underline underline-offset-2 transition-all decoration-secondary-foreground"
              >
                <Typography className="text-secondary-foreground">
                  {itemContext.channel.name}
                </Typography>
              </Link>
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
            <Flex className="justify-between">
              <Typography>Content</Typography>
              <Typography className="text-secondary-foreground truncate">
                {itemMetadata?.image === ''
                  ? truncateMiddle(
                      ipfsUrlToCid({ ipfsUrl: itemMetadata?.animationUri }),
                    )
                  : truncateMiddle(
                      ipfsUrlToCid({
                        ipfsUrl: itemMetadata?.image as string,
                      }),
                    )}
              </Typography>
            </Flex>
          </Stack>
        </Stack>
      ) : (
        <ItemIndex channel={channel} />
      )}
      {/* TODO: Enable these features */}
      {/* Add / Download */}
      <Flex className="justify-between opacity-0">
        <Typography className="text-secondary-foreground/50">
          Add to channel
        </Typography>
        <Typography className="text-secondary-foreground/50">
          Download
        </Typography>
      </Flex>
    </Stack>
  )
}

async function ItemIndex({ channel }: { channel: Channel }) {
  const totalItems = channel.adds?.items?.length ?? 0
  // @ts-ignore
  const { metadata } = await getAddsMetadata(channel?.adds?.items)
  return (
    <div className="overflow-y-auto">
      {channel?.adds?.items?.map((add: Adds, index: number) =>
        add.removed ? null : (
          <Link href={`/channel/${add.channelId}/${totalItems - index}`}>
            <Flex className="gap-4 py-[5px] items-center hover:cursor-pointer">
              <ThumbnailNameCreator item={add.item} metadata={metadata} />
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
