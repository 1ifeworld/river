import Image from 'next/image'
import { Stack, Typography, Card, Flex, Debug } from '@/design-system'
import { Channel } from '@/gql'
import { UploadDialog } from '@/client'
import { ipfsUrlToCid, pinataUrlFromCid } from '@/lib'
import { Username } from '@/server'

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
    <Stack className="gap-6 md:flex-row md:h-full md:items-end">
      {/* Column 1 */}
      <div className="relative">
        <Image
          className="object-cover w-full h-auto"
          src={pinataUrlFromCid({ cid })}
          alt={channelMetadata.name}
          width={0}
          height={0}
          sizes="(min-width: 768px) 25vw, 100vw"
        />
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
