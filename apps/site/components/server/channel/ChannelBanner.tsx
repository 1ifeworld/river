import Image from 'next/image'
import { Stack, Typography, Card, Flex, Debug } from '@/design-system'
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
      <Stack className="pt-[72px] gap-14">This is not a valid channel :/</Stack>
    )
  }

  const cid = ipfsUrlToCid({ ipfsUrl: channelMetadata.image })

  return (
    <Stack className="gap-4 md:gap-6 md:h-full ">
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
            <GenericThumbnailLarge text={'?'} />
          )}
        </>
      </div>
      <Stack className="gap-4 px-[14px] md:gap-5 md:px-5">
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
        {/* tailwind based media query conditional renderering */}
        <Typography className="hidden md:block text-primary-foreground">
          {channelMetadata.description}
        </Typography>
        <Typography className="md:hidden text-primary-foreground">
          {truncateText(channelMetadata.description, 90)}
        </Typography>        
        {/* tailwind based media query conditional renderering */}
        <UploadDialog />
      </Stack>
    </Stack>
  )
}
