import { Grid } from '@/design-system'
import { getAllChannels, type Channel } from '@/gql'
import { ChannelCard } from '@/server'

export default async function Home() {
  const { channels } = await getAllChannels()

  return (
    <div>
      <Grid className="grid-cols-1 md:grid-cols-[repeat(auto-fill,_minmax(272px,_1fr))] gap-2 pt-6">
        {channels.map((channel: Channel) => (
          <ChannelCard key={channel.id} channel={channel} />
        ))}
      </Grid>
    </div>
  )
}
