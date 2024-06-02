import {
  IMAGE_THUMBNAIL_TYPES_TO_RENDER,
  VIDEO_THUMBNAIL_TYPES_TO_RENDER,
} from '@/constants'
import { Flex, Stack, Typography, Public } from '@/design-system'
import type { Channel, ChannelRoles } from '@/gql'
import Image from 'next/image'
import { ItemFallback } from '@/server'
import { w3sUrlFromCid } from '@/lib'
import { UsernameNoFetch } from '@/client'
import { truncateText } from '@/utils'
import { USER_ID_ZERO } from '@/constants'

export function ChannelCard2({
  channel,
  metadata,
  imageBoxWidth,
  // biome-ignore lint:
}: { channel: Channel; metadata: any; imageBoxWidth: number }) {
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
    <Flex className="w-full gap-x-3 items-center">
      <div>
        {IMAGE_THUMBNAIL_TYPES_TO_RENDER.includes(
          metadata[0]?.itemMetadata?.contentType as string,
        ) ? (
          <Image
            src={w3sUrlFromCid({
              cid: metadata[0]?.itemMetadata?.image as string,
            })}
            alt={metadata[0]?.itemMetadata?.name as string}
            width={imageBoxWidth}
            height={imageBoxWidth}
            className="object-cover aspect-square"
          />
        ) : VIDEO_THUMBNAIL_TYPES_TO_RENDER.includes(
            metadata[0]?.itemMetadata?.contentType as string,
          ) ? (
          <Image
            className="object-contain"
            src={`https://image.mux.com/${metadata[0]?.itemMetadata?.muxPlaybackId}/thumbnail.png?width=${imageBoxWidth}&height=${imageBoxWidth}&fit_mode=smartcrop&time=35`}
            alt={metadata[0]?.itemMetadata?.name as string}
            quality={25}
            width={imageBoxWidth}
            height={imageBoxWidth}
          />
        ) : (
          <div className="w-full">
            {metadata?.length ? (
              <ItemFallback
                contentType={metadata[0]?.itemMetadata?.contentType as string}
                size="md"
              />
            ) : (
              <Flex className="bg-[#E9E9E9] justify-center items-center aspect-square w-16">
                <Typography className="text-secondary-foreground text-sm">
                  No items
                </Typography>
              </Flex>
            )}
          </div>
        )}
      </div>
      <Stack className="gap-y-[3px]">
        <Flex className="items-center space-x-[6px]">
          <Typography>{truncateText(channel?.name, 25, true)}</Typography>
          {isPublic && <Public />}
        </Flex>
        <UsernameNoFetch
          asLink={false}
          // @ts-ignore
          username={channel?.creatorUsername}
          // @ts-ignore
          activeMemberCount={channel?.activeMembers}
        />
      </Stack>
    </Flex>
  )
}
