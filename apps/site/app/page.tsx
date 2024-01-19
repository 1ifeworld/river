import { Grid, Stack } from '@/design-system'
import { type Channel, getAllChannels } from '@/gql'
import { getChannelMetadata } from '@/lib'
import { ChannelCard, Footer } from '@/server'

export default async function Home() {
  const { channels } = await getAllChannels()
  const { metadata } = await getChannelMetadata(channels)

  return (
    <Stack className="justify-between h-[100dvh] pt-8">
      <Grid className="grid-cols-1 md:grid-cols-[repeat(auto-fill,_minmax(272px,_1fr))] gap-2 py-3">
        {channels.map((channel: Channel, index: number) => (
          <ChannelCard key={index} channel={channel} metadata={metadata} />
        ))}
      </Grid>
      <Footer />
    </Stack>
  )
}
