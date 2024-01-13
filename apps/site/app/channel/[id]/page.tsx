import { Stack, Flex } from '@/design-system'
import { getChannelWithId } from '@/gql'
import { getChannelMetadata, getReferenceMetadata } from '@/lib'
import { ChannelBanner, ChannelItems, AllChannelsList } from '@/server'

export default async function Channel({
  params,
}: {
  params: { id: string }
}) {
  const { channel } = await getChannelWithId({
    id: params.id,
  })

  if (!channel) {
    return (
      <Stack className="pt-[72px] gap-14">This is not a valid channel</Stack>
    )
  }

  const { metadata: channelMetadata } = await getChannelMetadata([channel])
  const { metadata } = await getReferenceMetadata(channel?.references)

  return (
    <Flex className="pt-10 gap-28">
      <AllChannelsList params={params} />
      <Stack className="w-full md:w-3/4">
        <ChannelBanner channel={channel} metadata={channelMetadata} />
        <ChannelItems channel={channel} metadata={metadata} />
      </Stack>
    </Flex>
  )
}
