import Image from 'next/image'
import { Stack, Typography } from '@/design-system'
import { Channel } from '@/gql'
import { UploadDialog } from '@/client'
import { ipfsUrlToCid, pinataUrlFromCid } from '@/lib'
import { Username, GenericThumbnailLarge } from '@/server'
import { truncateText } from '@/utils'

export async function ChannelBanner({
  channel,
  metadata,
}: { channel: Channel; metadata: any }) {
  const channelMetadata = metadata.data[channel.uri as string]

  if (!channelMetadata) {
    return (
      <Stack className="pt-16 gap-14">
        <Typography>This is not a valid channel</Typography>/
      </Stack>
    )
  }

  const cid = ipfsUrlToCid({ ipfsUrl: channelMetadata.image })

  return (
    <Stack className="gap-4 md:gap-6 md:h-full md:w-[425px]">
      {/* The negative margin allows cover images to reach the edges of the screen */}
      <div className="relative -mx-5">
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
            <GenericThumbnailLarge text={'?'} />
          )}
        </>
      </div>
      <Stack className="gap-4 md:gap-5">
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
        {/* This component is hidden on small screens */}
        <Typography className="hidden md:block text-primary-foreground">
          {channelMetadata.description}
        </Typography>
        {/* This component is hidden on large screens */}
        <Typography className="md:hidden text-primary-foreground leading-none">
          {truncateText(channelMetadata.description, 90)}
        </Typography>
        <UploadDialog />
      </Stack>
    </Stack>
  )
}
