import { Flex, Stack, Typography } from '@/design-system'
import { type Adds } from '@/gql'
import { type MediaAssetObject, w3sUrlFromCid } from '@/lib'
import { unixTimeConverter } from '@/utils'
import { kv } from '@vercel/kv'
import Image from 'next/image'
import Link from 'next/link'
import { GenericThumbnailLarge, Username } from '@/server'
import { THUMBNAIL_TYPES_TO_RENDER } from '@/constants'

export async function ItemCard({
  add,
}: {
  add: Adds
}) {
  const itemMetadata = await kv.get<Pick<MediaAssetObject, 'value'>['value']>(
    add?.item?.uri as string,
  )

  const totalItems = add.channel.adds?.items?.length ?? 0

  const itemIndex =
    totalItems -
    (add.channel.adds?.items?.findIndex(
      (item) => item.itemId === add.item.id,
    ) as number)

  return (
    <Stack className="gap-y-[10px]">
      <Link
        href={`/channel/${add?.channelId}/${itemIndex}`}
        className="transition-all"
      >
        <Stack className="relative aspect-[5/6] justify-center items-center">
          {THUMBNAIL_TYPES_TO_RENDER.includes(
            itemMetadata?.contentType as string,
          ) ? (
            <Image
              className="object-contain"
              src={w3sUrlFromCid({ cid: itemMetadata?.image as string })}
              alt={itemMetadata?.name as string}
              fill
              quality={100}
              priority={true}
            />
          ) : (
            <GenericThumbnailLarge text={itemMetadata?.contentType as string} />
          )}
        </Stack>
      </Link>
      <Stack className="gap-y-[10px]">
        <div>
          <Link
            href={`/channel/${add?.channelId}/${itemIndex}`}
            className="hover:underline underline-offset-2 transition-all"
          >
            <Typography className="truncate">
              {itemMetadata?.name ?? 'untitled'}
            </Typography>
          </Link>
          <Flex className="items-center">
            <Username id={add.addedById} />
            <span className="text-secondary-foreground">{'·'}</span>
            <Link
              href={`/channel/${add.channelId}`}
              className="hover:underline underline-offset-2 transition-all decoration-secondary-foreground truncate"
            >
              <Typography className="text-secondary-foreground">
                {add.channel.name}
              </Typography>
            </Link>
          </Flex>
        </div>
        <Typography className="text-secondary-foreground">
          {unixTimeConverter(add.item.timestamp)}
        </Typography>
      </Stack>
    </Stack>
  )
}
