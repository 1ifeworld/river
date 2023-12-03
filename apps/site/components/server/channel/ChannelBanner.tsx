import Image from 'next/image'
import { Stack, Typography, Card, Flex } from '@/design-system'
import { Channel } from '@/gql'
import { UploadDialog } from '@/client'
import { ipfsToHttps } from '@/lib'
import { fetchIpfsData } from '@/utils'
import { Username } from '@/server'

export async function ChannelBanner({ channel }: { channel: Channel }) {
  const channelUriIpfsResponse = await fetchIpfsData(channel.uri as string)

  if (!channelUriIpfsResponse) {
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
          src={ipfsToHttps(channelUriIpfsResponse.image)}
          alt={channelUriIpfsResponse.name}
          fill
        />
      </Card>
      {/* Column 2 */}
      <Stack className="gap-5">
        <Stack>
          <Typography variant="h2" className="text-black">
            {channelUriIpfsResponse.name}
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
          {channelUriIpfsResponse.description}
        </Typography>
        <UploadDialog />
      </Stack>
    </Flex>
  )
}
