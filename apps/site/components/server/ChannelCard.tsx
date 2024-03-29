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
import {
  GenericThumbnailSmall,
  GenericThumbnailLarge,
  Username,
} from '@/server'
import { kv } from '@vercel/kv'
import { muxClient } from '@/config/mux'
import { isVideo } from '@/lib'

interface ChannelCardProps {
  channel: Channel
  width: number
  orientation?: number
  imgQuality?: number
}

export async function ChannelCard({
  channel,
  width,
  orientation = 0,
  imgQuality = 25,
}: ChannelCardProps) {
  const lastFourNonRemovedItems: Adds[] = (channel?.adds?.items ?? [])
    .filter((item) => !item.removed)
    .slice(0, 4)

  const channelCardMetadata = await Promise.all(
    lastFourNonRemovedItems.map(async (item) => {
      const metadata = await kv.get<Pick<MediaAssetObject, 'value'>['value']>(
        item.item.uri as string,
      )
      // If content type is video, add processing state
      if (metadata && isVideo({ mimeType: metadata.contentType })) {
        if (muxClient) {
          const { status } = await muxClient.video.assets.retrieve(
            metadata?.muxAssetId as string,
          )
          metadata.muxAssetStatus = status
        }
      }
      return metadata
    }) || [],
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
    <div
      className={
        ` w-full
        ${orientation === 0
          ? 'flex gap-x-3 items-center justify-start'
          : 'flex-col gap-y-[10px]'
        }`
      }
    >
      <Link href={`/channel/${channel.id}`}>
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
              width={width}
              height={width}
              className="object-cover aspect-square"
            />
          ) : VIDEO_THUMBNAIL_TYPES_TO_RENDER.includes(
              channelCardMetadata[0]?.contentType as string,
            ) && channelCardMetadata[0]?.muxAssetStatus === 'ready' ? (
            <Image
              className="object-contain"
              src={`https://image.mux.com/${channelCardMetadata[0]?.muxPlaybackId}/thumbnail.png?width=${width}&height=${width}&fit_mode=smartcrop&time=35`}
              alt={channelCardMetadata[0]?.name as string}
              quality={imgQuality}
              width={width}
              height={width}
            />
          ) : (
            <div
              className={
                orientation === 0 ? 'w-full' : `w-full md:w-64`
              }
            >
              {lastFourNonRemovedItems.length ? (
                <GenericThumbnailLarge
                  className={
                    orientation === 0
                      ? `border-border border-[0.5px] h-${width / 4} w-${
                          width / 4
                        } md:w-${width / 4}md:h-${width / 4}`
                      : ''
                  }
                  text={channelCardMetadata[0]?.contentType as string}
                />
              ) : (
                <Flex
                  className={
                    orientation === 0
                      ? `bg-[#E9E9E9] justify-center items-center aspect-square w-${
                          width / 4
                        }`
                      : 'bg-[#E9E9E9] justify-center items-center aspect-square'
                  }
                >
                  <Typography className="text-secondary-foreground">
                    No items
                  </Typography>
                </Flex>
              )}
            </div>
          )
        ) : (
          <Grid
            className={`grid-cols-2 grid-rows-2 md:w-${
              width / 4
            } aspect-square relative`}
          >
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
                  width={width / 2}
                  height={width / 2}
                  className="object-cover aspect-square"
                />
              ) : VIDEO_THUMBNAIL_TYPES_TO_RENDER.includes(
                  channelCardMetadata[index]?.contentType as string,
                ) && channelCardMetadata[index]?.muxAssetStatus === 'ready' ? (
                <Image
                  className="object-contain"
                  src={`https://image.mux.com/${
                    channelCardMetadata[index]?.muxPlaybackId
                  }/thumbnail.png?width=${width / 2}&height=${
                    width / 2
                  }&fit_mode=smartcrop&time=35`}
                  alt={channelCardMetadata[index]?.name as string}
                  quality={imgQuality}
                  width={width / 2}
                  height={width / 2}
                />
              ) : (
                <GenericThumbnailLarge
                  className={
                    orientation === 0
                      ? `border-border border-[0.5px] h-${width / 8} w-${
                          width / 8
                        } md:w-${width / 8}md:h-${width / 8}`
                      : 'border-border border-[0.5px]'
                  }
                  text={channelCardMetadata[index]?.contentType as string}
                />
              ),
            )}
          </Grid>
        )}
      </Link>
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
    </div>
  )
}
