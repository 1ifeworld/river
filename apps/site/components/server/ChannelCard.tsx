import Image from 'next/image'
import Link from 'next/link'
import {
  IMAGE_THUMBNAIL_TYPES_TO_RENDER,
  VIDEO_THUMBNAIL_TYPES_TO_RENDER,
  USER_ID_ZERO,
} from '@/constants'
import { truncateText } from '@/utils'
import { Flex, Grid, Stack, Typography, Public } from '@/design-system'
import type { Adds, Channel, ChannelRoles } from '@/gql'
import { type MediaAssetObject, w3sUrlFromCid } from '@/lib'
import { GenericThumbnailSmall, Username } from '@/server'
import { kv } from '@vercel/kv'

export async function ChannelCard({ channel }: { channel: Channel }) {
  const lastFourNonRemovedItems: Adds[] = (channel?.adds?.items ?? [])
    .filter((item) => !item.removed)
    .slice(0, 4)

  const channelCardMetadata = await Promise.all(
    lastFourNonRemovedItems.map((item) =>
      kv.get<Pick<MediaAssetObject, 'value'>['value']>(item.item.uri as string),
    ) || [],
  )

  function checkIsPublic({ roleData }: { roleData: ChannelRoles[] }) {
    for (let i = 0; i < roleData.length; ++i) {
      if (roleData[i].rid === USER_ID_ZERO && roleData[i].role > 0) return true
    }
    return false
  }

  const isPublic = !channel?.roles?.items
    ? false
    : checkIsPublic({ roleData: channel?.roles?.items })

  return (
    <Flex className="w-full gap-x-3 items-center justify-start">
      <Link className="block" href={`/channel/${channel.id}`}>
        {/* <div> */}
        {(lastFourNonRemovedItems.length as number) < 4 ? (
          IMAGE_THUMBNAIL_TYPES_TO_RENDER.includes(
            channelCardMetadata[0]?.contentType as string,
          ) ? (
            <Image
              src={w3sUrlFromCid({
                cid: channelCardMetadata[0]?.image as string,
              })}
              alt={channelCardMetadata[0]?.name as string}
              width={64}
              height={64}
              className="object-cover aspect-square"
            />
          ) : VIDEO_THUMBNAIL_TYPES_TO_RENDER.includes(
              channelCardMetadata[0]?.contentType as string,
            ) ? (
            <Image
              className="object-contain"
              src={`https://image.mux.com/${channelCardMetadata[0]?.muxPlaybackId}/thumbnail.png?width=64&height=64&fit_mode=smartcrop&time=35`}
              alt={channelCardMetadata[0]?.name as string}
              quality={25}
              width={64}
              height={64}
            />
          ) : (
            <div className="w-full ">
              {lastFourNonRemovedItems.length ? (
                <GenericThumbnailSmall
                  className="border-border border-[0.5px] h-16 w-16 md:w-16 md:h-16"
                  text={channelCardMetadata[0]?.contentType as string}
                />
              ) : (
                <Flex className="bg-[#E9E9E9] justify-center items-center aspect-square w-16">
                  <Typography className="text-secondary-foreground">
                    No items
                  </Typography>
                </Flex>
              )}
            </div>
          )
        ) : (
          <Grid className="grid-cols-2 grid-rows-2 aspect-square relative">
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
                  width={32}
                  height={32}
                  className="object-cover aspect-square"
                />
              ) : VIDEO_THUMBNAIL_TYPES_TO_RENDER.includes(
                  channelCardMetadata[index]?.contentType as string,
                ) ? (
                <Image
                  className="object-contain"
                  src={`https://image.mux.com/${channelCardMetadata[index]?.muxPlaybackId}/thumbnail.png?width=32&height=32&fit_mode=smartcrop&time=35`}
                  alt={channelCardMetadata[index]?.name as string}
                  quality={25}
                  width={32}
                  height={32}
                />
              ) : (
                <GenericThumbnailSmall
                  className="border-border border-[0.25px] w-8 h-8 md:w-8 md:h-8"
                  text={channelCardMetadata[index]?.contentType as string}
                />
              ),
            )}
          </Grid>
        )}
      </Link>
      {/* </div> */}
      <Stack className="gap-y-[3px]">
        <Link
          href={`/channel/${channel.id}`}
          className="flex justify-between items-center space-x-[6px] hover:underline underline-offset-2 transition-all truncate"
        >
          <Typography>{truncateText(channel?.name, 25, true)}</Typography>
          {isPublic && <Public />}
        </Link>
        <Username id={channel.createdById} />
      </Stack>
    </Flex>
  )
}
