'use client'

import Image from 'next/image'
import { Stack, Typography, Card, Flex, Debug } from '@/design-system'
import { Channel } from '@/gql'
import { UploadDialog, Username, GenericThumbnailLarge } from '@/client'
import { ipfsUrlToCid, pinataUrlFromCid } from '@/lib'

export function BannerWeb({
  channel,
  metadata,
}: { channel: Channel; metadata: any }) {
  const channelMetadata = metadata.data[channel.uri as string]

  if (!channelMetadata) {
    return (
      <Stack className="pt-[72px] gap-14">Channel does not exist</Stack>
    )
  }

  const cid = ipfsUrlToCid({ ipfsUrl: channelMetadata.image })

  return (
    <Stack className="gap-6 md:flex-row md:h-full md:items-end px-5">
      {/* Column 1 */}
      <div className="relative">
        <>
          {cid ? (
              <Image
              className="object-cover w-full h-[316px]"
              src={pinataUrlFromCid({ cid })}
              alt={channelMetadata.name}
              width={0}
              height={0}
              sizes="(min-width: 768px) 25vw, 100vw"              
              priority={true}
            />            
          ) : (
            <GenericThumbnailLarge text={"?"} />
          )}
        </>
      </div>
      {/* Column 2 */}
      <Stack className="gap-5">
        <Stack>
          <Typography variant="h2" className="text-black">
            {channelMetadata.name}
          </Typography>
          <Typography variant="h2" className="text-secondary-foreground">
            {channel?.admins?.[0] ? (
              <Username id={channel?.admins?.[0]} />
            ) : (
              'No admins configured for this channel'
            )}
          </Typography>
        </Stack>
        <Typography className="text-primary-foreground">
          {channelMetadata.description}
        </Typography>
        <UploadDialog />
      </Stack>
    </Stack>
  )
}
