import { Stack, Typography } from '@/design-system'
import { getChannelWithId, type Adds } from '@/gql'
import { getAddsMetadata } from '@/lib'
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
  // const { metadata } = await getItemMetadata(channel?.references)
  // @ts-ignore
  const { metadata } = await getAddsMetadata(channel?.adds?.items)

  console.log("metadat: ", metadata)

  // const itemMetadata = await kv.get(
  //   reference?.pubRef?.uri as string,
  // )


  return (
    <Stack>
      <Stack className="gap-y-[45px]">
        {/* <ChannelBanner channel={channel} metadata={channelMetadata} /> */}
        <ChannelBanner channel={channel}  />
        <ChannelItems channel={channel} metadata={metadata} />
        {/* <ChannelItems channel={channel}  /> */}
      </Stack>
      <ChannelDetails channel={channel} />
    </Stack>
  )
}
