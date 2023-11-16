import { getChannels, type Node } from '@/gql'
import { Hash } from 'viem'
import { Stack } from '@/design-system'
import { ActivityBanner, ActivityChannels, ActivityItems } from '@/server'

export default async function Channel({
  params,
}: {
  params: { channelHash: Hash }
}) {
  // const { user } = await getUser()
  
  return (
    <Stack className="pt-[72px] gap-14">
        {`Check out my channel hash: ${params.channelHash}`}
    </Stack>
  )
}
