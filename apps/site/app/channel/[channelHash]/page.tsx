import { getChannel, type Channel, ChannelWithHashQuery } from '@/gql'
import { Stack } from '@/design-system'
import { ChannelBanner, ChannelItems } from '@/server'

export default async function Channel({
  params,
}: {
  params: { channelHash: string }
}) {
  const channel: ChannelWithHashQuery = await getChannel({
    hashId: params.channelHash,
  })

  if (channel.channels.length == 0) {
    return (
      <Stack className="pt-[72px] gap-14">This is not a valid channel :/</Stack>
    )
  }

  // channel banner
  // name, desc, imageUri, createdAt, items, nodeAdmins, nodeMembers,

  return (
    <Stack className="pt-[72px] gap-14 h-full">
      <ChannelBanner channel={channel} />
      <ChannelItems channel={channel} />
    </Stack>
  )
}
