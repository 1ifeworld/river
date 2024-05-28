import Image from 'next/image'
import Link from 'next/link'
import {
  IMAGE_THUMBNAIL_TYPES_TO_RENDER,
  VIDEO_THUMBNAIL_TYPES_TO_RENDER,
  USER_ID_ZERO,
} from '@/constants'
import { truncateText } from '@/utils'
import { Flex, Stack, Typography, Public } from '@/design-system'
import type { Adds, Channel, ChannelRoles } from '@/gql'
import { type MediaAssetObject, w3sUrlFromCid } from '@/lib'
import { GenericThumbnailLarge, Username } from '@/server'
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
  // Access the most recent non-removed item
  const lastNonRemovedItem: Adds | undefined = (
    channel?.adds?.items ?? []
  ).find((item) => !item.removed)

  // Access the metadata of the most recent non-removed item and update with Mux processing status if it's a video
  const channelCardMetadata = await kv.get<
    Pick<MediaAssetObject, 'value'>['value']
  >(lastNonRemovedItem?.item.uri as string)
  if (
    channelCardMetadata &&
    isVideo({ mimeType: channelCardMetadata.contentType })
  ) {
    if (muxClient) {
      const { status } = await muxClient.video.assets.retrieve(
        channelCardMetadata?.muxAssetId as string,
      )
      channelCardMetadata.muxAssetStatus = status
    }
  }

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
    <Link
      href={`/channel/${channel.id}`}
      className={`w-full
        ${
          orientation === 0
            ? 'flex gap-x-3 items-center justify-start'
            : 'flex-col space-y-[10px]'
        }`}
    >
      {IMAGE_THUMBNAIL_TYPES_TO_RENDER.includes(
        channelCardMetadata?.contentType as string,
      ) ? (
        <Image
          src={w3sUrlFromCid({
            cid: channelCardMetadata?.image as string,
          })}
          alt={channelCardMetadata?.name as string}
          width={width}
          height={width}
          className="object-cover aspect-square"
          unoptimized={true}
        />
      ) : VIDEO_THUMBNAIL_TYPES_TO_RENDER.includes(
          channelCardMetadata?.contentType as string,
        ) && channelCardMetadata?.muxAssetStatus === 'ready' ? (
        <Image
          className="object-contain"
          src={`https://image.mux.com/${channelCardMetadata?.muxPlaybackId}/thumbnail.png?width=${width}&height=${width}&fit_mode=smartcrop&time=35`}
          alt={channelCardMetadata?.name as string}
          quality={imgQuality}
          width={width}
          height={width}
        />
      ) : (
        <GenericThumbnailLarge
          className={`${
            orientation === 0 ? `h-${width / 4} w-${width / 4}` : ''
          }`}
          text={channelCardMetadata?.contentType as string}
        />
      )}
      <Stack className="gap-y-[3px]">
        <Link
          href={`/channel/${channel.id}`}
          className="flex justify-between items-center space-x-[6px] hover:underline underline-offset-2 transition-all truncate"
        >
          <Flex>
            <Typography>{truncateText(channel?.name, 25, true)}</Typography>
            {isPublic && (
              <div className="ml-[6px] mt-[2px]">
                <Public />
              </div>
            )}
          </Flex>
        </Link>
        <Username id={channel.createdById} />
      </Stack>
    </Link>
  )
}
