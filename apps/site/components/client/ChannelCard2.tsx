import {
  IMAGE_THUMBNAIL_TYPES_TO_RENDER,
  VIDEO_THUMBNAIL_TYPES_TO_RENDER,
} from '@/constants'
import { Flex, Grid, Stack, Typography } from '@/design-system'
import type { Channel } from '@/gql'
import Image from 'next/image'
import { GenericThumbnailSmall } from '@/server'
import { w3sUrlFromCid } from '@/lib'
import { UsernameNoFetch } from '@/client'
import { truncateText } from '@/utils'

export function ChannelCard2({
  channel,
  metadata,
  imageBoxWidth,
  // biome-ignore lint:
}: { channel: Channel; metadata: any; imageBoxWidth: number }) {
  return (
    <Flex className="w-full gap-x-3 items-center">
      <div>
        {(metadata?.length as number) < 4 ? (
          IMAGE_THUMBNAIL_TYPES_TO_RENDER.includes(
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
                <GenericThumbnailSmall
                  className="border-border border-[0.5px] h-16 w-16 md:w-16 md:h-16"
                  text={metadata[0]?.itemMetadata?.contentType as string}
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
            {/* biome-ignore lint: */}
            {metadata?.map((item: any, index: number) =>
              IMAGE_THUMBNAIL_TYPES_TO_RENDER.includes(
                metadata[index]?.itemMetadata?.contentType as string,
              ) ? (
                <Image
                  key={index}
                  src={w3sUrlFromCid({
                    cid: metadata[index]?.itemMetadata?.image as string,
                  })}
                  alt={metadata[index]?.itemMetadata?.name as string}
                  width={imageBoxWidth / 2}
                  height={imageBoxWidth / 2}
                  className="object-cover aspect-square"
                />
              ) : VIDEO_THUMBNAIL_TYPES_TO_RENDER.includes(
                  metadata[index]?.itemMetadata?.contentType as string,
                ) ? (
                <Image
                  className="object-contain"
                  src={`https://image.mux.com/${metadata[index]?.itemMetadata?.muxPlaybackId}/thumbnail.png?width=${imageBoxWidth}&height=${imageBoxWidth}&fit_mode=smartcrop&time=35`}
                  alt={metadata[index]?.itemMetadata?.name as string}
                  quality={25}
                  width={imageBoxWidth / 2}
                  height={imageBoxWidth / 2}
                />
              ) : (
                <GenericThumbnailSmall
                  className="border-border border-[0.25px] w-8 h-8 md:w-8 md:h-8"
                  text={metadata[index]?.itemMetadata?.contentType as string}
                />
              ),
            )}
          </Grid>
        )}
      </div>
      <Stack className="gap-y-[3px]">
        <Flex className="justify-between items-center">
          <Typography>{truncateText(channel?.name, 28, true)}</Typography>
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
