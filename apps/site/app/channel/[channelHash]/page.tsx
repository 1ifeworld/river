import { getChannel } from '@/gql'
import { Stack } from '@/design-system'
import { ChannelBanner } from '@/server'

export default async function Channel({
  params,
}: {
  params: { channelHash: string }
}) {
  const { channel } = await getChannel({ hashId: params.channelHash })

  if (channel.length == 0) {
    return (
      <Stack className="pt-[72px] gap-14">This is not a valid channel :/</Stack>
    )
  }

  return (
    <Stack className="pt-[72px] gap-14 border-2 h-full">
      <ChannelBanner channel={channel} />
    </Stack>
  )
}
