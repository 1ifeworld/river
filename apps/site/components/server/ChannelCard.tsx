import {
  IMAGE_THUMBNAIL_TYPES_TO_RENDER,
  VIDEO_THUMBNAIL_TYPES_TO_RENDER,
} from '@/constants'
import { Flex, Grid, Stack, Typography } from '@/design-system'
import type { Adds, Channel } from '@/gql'
import { type MediaAssetObject, w3sUrlFromCid } from '@/lib'
import { GenericThumbnailLarge, Username } from '@/server'
import { kv } from '@vercel/kv'
import Image from 'next/image'
import Link from 'next/link'

export async function ChannelCard({ channel }: { channel: Channel }) {
  const lastFourNonRemovedItems: Adds[] = (channel?.adds?.items ?? [])
    .filter((item) => !item.removed)
    .slice(0, 4)

  const channelCardMetadata = await Promise.all(
    lastFourNonRemovedItems.map((item) =>
      kv.get<Pick<MediaAssetObject, 'value'>['value']>(item.item.uri as string),
    ) || [],
  )

  return (
    <Stack className="w-full gap-y-[10px]">
      <Link href={`/channel/${channel.id}`}>
        {(lastFourNonRemovedItems.length as number) < 4 ? (
          IMAGE_THUMBNAIL_TYPES_TO_RENDER.includes(
            channelCardMetadata[0]?.contentType as string,
          ) ? (
            <Image
              src={w3sUrlFromCid({
                cid: channelCardMetadata[0]?.image as string,
              })}
              alt={channelCardMetadata[0]?.name as string}
              width={256}
              height={256}
              className="object-cover aspect-square"
            />
          ) : VIDEO_THUMBNAIL_TYPES_TO_RENDER.includes(
              channelCardMetadata[0]?.contentType as string,
            ) ? (
            <Image
              className="object-contain"
              src={`https://image.mux.com/${channelCardMetadata[0]?.muxPlaybackId}/thumbnail.png?width=256&height=256&fit_mode=smartcrop&time=35`}
              alt={channelCardMetadata[0]?.name as string}
              quality={100}
              width={256}
              height={256}
            />
          ) : (
            <div className="w-full md:w-64">
              {lastFourNonRemovedItems.length ? (
                <GenericThumbnailLarge
                  text={channelCardMetadata[0]?.contentType as string}
                />
              ) : (
                <Flex className="bg-[#E9E9E9] justify-center items-center aspect-square">
                  <Typography className="text-secondary-foreground">
                    No items
                  </Typography>
                </Flex>
              )}
            </div>
          )
        ) : (
          <Grid className="grid-cols-2 grid-rows-2 aspect-square md:w-64 relative">
            {lastFourNonRemovedItems.map((item, index) =>
              IMAGE_THUMBNAIL_TYPES_TO_RENDER.includes(
                channelCardMetadata[index]?.contentType as string,
              ) ? (
                <Image
                  key={index}
                  src={w3sUrlFromCid({
                    cid: channelCardMetadata[index]?.image as string,
                  })}
                  alt={channelCardMetadata[index]?.name as string}
                  width={128}
                  height={128}
                  className="object-cover aspect-square"
                />
              ) : VIDEO_THUMBNAIL_TYPES_TO_RENDER.includes(
                  channelCardMetadata[index]?.contentType as string,
                ) ? (
                <Image
                  className="object-contain"
                  src={`https://image.mux.com/${channelCardMetadata[index]?.muxPlaybackId}/thumbnail.png?width=128&height=128&fit_mode=smartcrop&time=35`}
                  alt={channelCardMetadata[index]?.name as string}
                  quality={100}
                  width={128}
                  height={128}
                />
              ) : (
                <GenericThumbnailLarge
                  className="border-border border-[0.5px]"
                  text={channelCardMetadata[index]?.contentType as string}
                />
              ),
            )}
          </Grid>
        )}
      </Link>
      <Stack className="gap-y-[3px]">
        <Flex className="justify-between items-center">
          <Link
            href={`/channel/${channel.id}`}
            className="hover:underline underline-offset-2 transition-all truncate"
          >
            <Typography>{channel.name}</Typography>
          </Link>
        </Flex>
        <Username id={channel.createdById} />
      </Stack>
    </Stack>
  )
}
