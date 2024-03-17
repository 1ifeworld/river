'use client'

import {
    IMAGE_THUMBNAIL_TYPES_TO_RENDER,
    VIDEO_THUMBNAIL_TYPES_TO_RENDER,
  } from '@/constants'
  import { Flex, Grid, Stack, Typography, cn } from '@/design-system'
  import type { Adds, Channel } from '@/gql'
  import { type MediaAssetObject, } from '@/lib'
  // import { Username } from '@/server'
  import { kv } from '@vercel/kv'
  import Image from 'next/image'
  import Link from 'next/link'

  function w3sUrlFromCid({ cid }: { cid: string }) {
    return `https://ipfs.w3s.link/ipfs/${cid}`
  }

  function extractFileExtension(mimeType: string): string {
    if (!mimeType) {
      return ''
    }
    const lastSlashIndex = mimeType.lastIndexOf('/')
    if (lastSlashIndex !== -1) {
      return `.${mimeType.substring(lastSlashIndex + 1)}`
    }
    return ''
  }
  
  export function GenericThumbnailLarge({
    text,
    className,
  }: { text: string; className?: string }) {
    return (
      <Stack
        className={cn(
          'bg-[#E9E9E9] justify-center items-center aspect-square w-full',
          className,
        )}
      >
        <Typography className="text-secondary-foreground md:text-2xl">
          {extractFileExtension(text)}
        </Typography>
      </Stack>
    )
  }
  
  export function ChannelCard2({ channel, metadata, imageBoxWidth }: { channel: Channel, metadata: any, imageBoxWidth: number }) {

    const width = imageBoxWidth / 2
    console.log("metadtaa in chanel card 2: ", metadata)

    // console.log("metadata[0]", metadata[0])
    // console.log("metadata[0].itemMetadata", metadata[0].itemMetadata)

    // return (
    //   <Flex>
    //   {metadata.length == 0 ? (
    //     <Typography>{channel.name}</Typography>
    //   ) : (

    //                   <Image
    //             src={w3sUrlFromCid({
    //               cid: metadata[0].itemMetadata?.image as string,
    //             })}
    //             alt={metadata[0].itemMetadata?.name as string}
    //             width={imageBoxWidth}
    //             height={imageBoxWidth}
    //             className="object-cover aspect-square"
    //           />
    //         )}
    //       {/* {
    //         IMAGE_THUMBNAIL_TYPES_TO_RENDER.includes(
    //             metadata[0].itemMetadata?.contentType as string,
    //         ) ? (
    //           <Image
    //             src={w3sUrlFromCid({
    //               cid: metadata[0].itemMetadata?.image as string,
    //             })}
    //             alt={metadata[0].itemMetadata?.name as string}
    //             width={imageBoxWidth}
    //             height={imageBoxWidth}
    //             className="object-cover aspect-square"
    //           />
    //         ) : VIDEO_THUMBNAIL_TYPES_TO_RENDER.includes(
    //             metadata[0]?.itemMetadata?.contentType as string,
    //           ) ? (
    //           <Image
    //             className="object-contain"
    //             src={`https://image.mux.com/${metadata[0].itemMetadata?.muxPlaybackId}/thumbnail.png?width=256&height=256&fit_mode=smartcrop&time=35`}
    //             alt={metadata[0].itemMetadata?.name as string}
    //             quality={100}
    //             width={imageBoxWidth}
    //             height={imageBoxWidth}
    //           />
    //         ) : (
    //           <div className="w-full md:w-64">
    //             {metadata?.length > 0 ? (
    //               <GenericThumbnailLarge
    //                 text={metadata[0].itemMetadata?.contentType as string}
    //               />
    //             ) : (
    //               <Flex className="bg-[#E9E9E9] justify-center items-center aspect-square">
    //                 <Typography className="text-secondary-foreground">
    //                   No items
    //                 </Typography>
    //               </Flex>
    //             )}
    //           </div>
    //         )} */}
    //   </Flex>
    // )

    return (
      <Flex className="w-full gap-x-[12px] items-center">
        <Link href={`/channel/${channel?.id}`}>
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
                quality={100}
                width={imageBoxWidth}
                height={imageBoxWidth}
              />
            ) : (
              <div className="w-full">
                {metadata?.length ? (
                  <GenericThumbnailLarge
                  className='w-[64px]'
                    text={metadata[0]?.itemMetadata?.contentType as string}
                  />
                ) : (
                  <Flex className={`bg-[#E9E9E9] justify-center items-center aspect-square w-[64px]`}>
                    <Typography className={`text-secondary-foreground`}>
                      No items
                    </Typography>
                  </Flex>
                )}
              </div>
            )
          ) : (
            <Grid className="grid-cols-2 grid-rows-2 aspect-square md:w-64 relative">
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
                    width={imageBoxWidth/2}
                    height={imageBoxWidth/2}
                    className="object-cover aspect-square"
                  />
                ) : VIDEO_THUMBNAIL_TYPES_TO_RENDER.includes(
                    metadata[index]?.itemMetadata?.contentType as string,
                  ) ? (
                  <Image
                    className="object-contain"
                    src={`https://image.mux.com/${metadata[index]?.itemMetadata?.muxPlaybackId}/thumbnail.png?width=${imageBoxWidth}&height=${imageBoxWidth}&fit_mode=smartcrop&time=35`}
                    alt={metadata[index]?.itemMetadata?.name as string}
                    quality={100}
                    width={imageBoxWidth/2}
                    height={imageBoxWidth/2}
                  />
                ) : (
                  <GenericThumbnailLarge
                    className="border-border border-[0.5px] w-[32px]"
                    text={metadata[index]?.itemMetadata?.contentType as string}
                  />
                ),
              )}
            </Grid>
          )}
        </Link>
        <Stack className="gap-y-[3px]">
          <Flex className="justify-between items-center">
            <Link
              href={`/channel/${channel?.id}`}
              className="hover:underline underline-offset-2 transition-all truncate"
            >
              <Typography>{channel?.name}</Typography>
            </Link>
          </Flex>
          {/* <Username id={channel?.createdById} /> */}
        </Stack>
      </Flex>
    )
  }
  