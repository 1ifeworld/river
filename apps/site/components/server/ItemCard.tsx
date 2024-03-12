import {
  IMAGE_THUMBNAIL_TYPES_TO_RENDER,
  VIDEO_THUMBNAIL_TYPES_TO_RENDER,
} from '@/constants'
import { Flex, Stack, Typography } from '@/design-system'
import type { Adds } from '@/gql'
import { type MediaAssetObject, w3sUrlFromCid } from '@/lib'
import { GenericThumbnailLarge, Username } from '@/server'
import { unixTimeConverter } from '@/utils'
import { kv } from '@vercel/kv'
import Image from 'next/image'
import Link from 'next/link'

export async function ItemCard({
  add,
  dropdownComponent,
}: {
  add: Adds
  dropdownComponent?: React.ReactNode
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
          {IMAGE_THUMBNAIL_TYPES_TO_RENDER.includes(
            itemMetadata?.contentType as string,
          ) ? (
            <Image
              className="object-contain"
              src={w3sUrlFromCid({ cid: itemMetadata?.image as string })}
              alt={itemMetadata?.name as string}
              fill
              quality={100}
              sizes="(min-width: 1200px) 20vw, (min-width: 768px) 25vw, 50vw"
              priority={true}
            />
          ) : VIDEO_THUMBNAIL_TYPES_TO_RENDER.includes(
              itemMetadata?.contentType as string,
            ) ? (
            <Image
              className="object-contain"
              src={`https://image.mux.com/${itemMetadata?.muxPlaybackId}/thumbnail.png?width=1200&height=1000&fit_mode=smartcrop&time=35`}
              alt={itemMetadata?.name as string}
              fill
              quality={100}
              sizes="(min-width: 1200px) 20vw, (min-width: 768px) 25vw, 50vw"
              priority={true}
            />
          ) : (
            <GenericThumbnailLarge text={itemMetadata?.contentType as string} />
          )}
        </Stack>
      </Link>
      <Stack className="gap-y-[10px]">
        <div>
          <Flex className="items-center justify-between">
            <Link
              href={`/channel/${add?.channelId}/${itemIndex}`}
              className="hover:underline underline-offset-2 transition-all w-4/6"
            >
              <Typography className="truncate">
                {itemMetadata?.name ?? 'untitled'}
              </Typography>
            </Link>
            {dropdownComponent}
          </Flex>
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
