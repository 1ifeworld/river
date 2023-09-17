import { Grid } from '@river/estuary'
import { getAllChannels, type Channel } from '@/gql'
import { ChannelCard } from '@/client'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const { channels } = await getAllChannels()

  const channelsWithNoName = channels.filter(
    (channel) => channel?.contractUri?.image !== '',
  )

  return (
    <Grid className="grid-cols-[repeat(auto-fill,_minmax(224px,_1fr))] m-10 gap-5 pb-4">
      {channelsWithNoName.map((validChannel: Channel) => (
        <ChannelCard key={validChannel.id} channel={validChannel} />
      ))}
    </Grid>
  )
}
