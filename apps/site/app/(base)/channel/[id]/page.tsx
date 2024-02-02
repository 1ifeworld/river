import { Stack, Typography } from '@/design-system'
import { getChannelWithId } from '@/gql'
// import { getReferenceMetadata } from '@/lib'
import { ChannelBanner, ChannelItems, ChannelDetails } from '@/server'

export default async function Channel({
  params,
}: {
  params: { id: string }
}) {
  const { channel } = await getChannelWithId({
    id: params.id,
  })

  if (!channel) {
    return <Typography>This is not a valid channel</Typography>
  }

  // const { metadata: channelMetadata } = await getChannelMetadata([channel])
  // const { metadata } = await getReferenceMetadata(channel?.references)

  return (
    <Stack>
      <Stack className="gap-y-[45px]">
        {/* <ChannelBanner channel={channel} metadata={channelMetadata} /> */}
        <ChannelBanner channel={channel}  />
        {/* <ChannelItems channel={channel} metadata={metadata} /> */}
        {/* <ChannelItems channel={channel}  /> */}
      </Stack>
      <ChannelDetails channel={channel} />
    </Stack>
  )
}
