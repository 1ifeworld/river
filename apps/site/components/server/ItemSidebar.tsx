import { Typography, Stack, Flex } from '@/design-system'
import { type Adds, type Channel } from '@/gql'
import { ipfsUrlToCid, getAddsMetadata } from '@/lib'
import { unixTimeConverter } from '@/utils'
import Link from 'next/link'
import { Username, ThumbnailNameCreator } from '@/server'
import { InfoIndexToggle } from '@/client'
import styles from './channel/ChannelItems.module.css'

interface ItemSidebarProps {
  itemContext: Adds
  itemMetadata: {
    name: string
    description: string
    image: string
    animationUri: string
    contentType: string
    muxAssetId?: string
    muxPlaybackId?: string
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
    <Stack className="p-5 h-[300px] md:h-full border-t border-border md:border-none">
      <InfoIndexToggle />
      {view === 'index' ? (
        <ItemIndex channel={channel} />
      ) : (
        <div>
          <Stack className="gap-y-5">
            <div>
              <Typography className="truncate">{itemMetadata?.name}</Typography>
              <Username id={itemContext.item.createdById} />
            </div>
            <Typography>{'--'}</Typography>
          </Stack>
          <Stack className="pt-[45px] gap-y-[3px]">
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
        </div>
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
    <div className="overflow-y-auto md:overflow-hidden">
      {channel?.adds?.items?.map((add: Adds, index: number) =>
        add.removed ? null : (
          <Link
            href={`/channel/${add.channelId}/${totalItems - index}`}
            className={`${styles.tableRow}`}
          >
            <Flex className="gap-4 py-2 items-center hover:cursor-pointer">
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