import { getChannel, type Channel } from '@/gql'
import { Stack } from '@river/estuary'
import { ChannelBanner, ChannelBody } from '@/server'
import { getAddress } from 'viem'

export default async function Channel({
  params,
}: {
  params: { contract: string }
}) {
  const { channels } = await getChannel({
    channel: getAddress(params.contract) as string,
  })


  console.log("listings: ", channels[0]?.listings[1].id)
  console.log("listings: ", channels[0]?.listings[9].id)
  
  return (
    <Stack className="m-6 md:m-10 gap-y-[88px]">
      <ChannelBanner channels={channels?.[0]} />
      <ChannelBody listings={channels[0]?.listings} />
    </Stack>
  )
}
