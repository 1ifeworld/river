import { getChannel } from '../../../gql/requests/getChannel'
import { Stack } from '@river/design-system'
import { ChannelBanner, ChannelBody } from '../../../components/server/channel'
import { type Channel } from '../../../gql/sdk.generated'
import { getAddress } from 'viem'

export default async function Channel({
  params,
}: {
  params: { contract: string }
}) {
  const { channels } = await getChannel({
    channel: getAddress(params.contract) as string,
  })

  return (
    <Stack className="m-10 gap-y-[88px]">
      <ChannelBanner channels={channels?.[0]} />
      <ChannelBody listings={channels[0]?.listings} />
    </Stack>
  )
}
