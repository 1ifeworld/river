import { getChannel } from '@/gql'
import { Stack } from '@/design-system'
import { ChannelBanner, ChannelItems } from '@/server'

export const dynamic = 'force-dynamic'

export default async function Channel({
  params,
}: {
  params: { channelHash: string }
}) {
  const { channel } = await getChannel({
    hashId: params.channelHash,
  })

  if (!channel) {
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
