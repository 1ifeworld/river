import { Header } from '@/client'
import { Grid } from '@/design-system'
import { getChannels, type Node } from '@/gql'
import { ChannelCard } from '@/server'

// TODO: This should get moved to our offchain-schema package as a constant.
//       Likely this value should also live in the `getChannels()` helper
//       and not be passed through as a prop.
const channelSchema =
  '0x1234567890123456789012345678901234567890123456789012345678901234'

export default async function Home() {
  const { channels } = await getChannels({ schema: channelSchema })

  return (
    <div className="p-4">
      <Header />
      <Grid className="grid-cols-1 md:grid-cols-[repeat(auto-fill,_minmax(272px,_1fr))] gap-2 pt-6">
        {channels.map((channel: Node) => (
          <ChannelCard key={channel.id} channel={channel} />
        ))}
      </Grid>
    </div>
  )
}
