import { getChannel } from '@/gql'
import { Hash } from 'viem'
import { Stack } from '@/design-system'
import { ActivityBanner, ActivityChannels, ActivityItems } from '@/server'

export default async function Channel({
  params,
}: {
  params: { channelHash: Hash }
}) {

  const { channel } = await getChannel({hashId: params.channelHash})

  if (channel.length == 0) {
    return (
      <Stack className="pt-[72px] gap-14">
        This is not a valid channel :/
      </Stack>      
    )
  }

  return (
    <Stack className="pt-[72px] gap-14">
        {`Welcome to channel hash ${params.channelHash} !!!`}
    </Stack>
  )
}
