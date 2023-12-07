import Image from 'next/image'
import { Stack, Typography, Card, Flex } from '@/design-system'
import { Channel } from '@/gql'
import { UploadDialog } from '@/client'
import { ipfsToHttps } from '@/lib'
import { Username } from '@/server'

export async function ChannelBanner({ channel, metadata }: { channel: Channel, metadata: any }) {

  const channelMetadata = metadata.data[channel.uri as string]

  if (!channelMetadata) {
    return (
      <Stack className="pt-[72px] gap-14">This is not a valid channel :/</Stack>
    )
  }

  return (
    <Flex className="items-end h-full gap-6">
      {/* Column 1 */}
      <Card className="relative w-[218px] h-[218px] outline-none border-none">
        <Image
          className="object-cover aspect-square"
          src={ipfsToHttps(channelMetadata.image)}
          alt={channelMetadata.name}
          fill
        />
      </Card>
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
    </Flex>
  )
}
