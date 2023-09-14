import { Flex } from '@river/design-system'
import { getAllChannels } from '../gql/requests/getAllChannels'
import { type Channel } from '../gql/sdk.generated'
import { ChannelCard } from '../components/client'

export default async function Home() {
  const { channels } = await getAllChannels()

  const channelsWithNoName = channels.filter(
    (channel) =>
      channel?.contractUri?.image && channel.contractUri.image.trim() !== '',
  )

  return (
    <Flex className="m-[40px] flex-wrap gap-5 pb-4">
      {channelsWithNoName.map((validChannel: Channel) => (
        <ChannelCard key={validChannel.id} channel={validChannel} />
      ))}
    </Flex>
  )
}
