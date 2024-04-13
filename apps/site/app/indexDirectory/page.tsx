import { Stack, Typography, Grid } from '@/design-system'
import { getAllChannels } from '@/gql'
import Link from 'next/link'
import { MarqueeWrapper } from '@/server'

export default async function IndexDirectory() {
  const { channels } = await getAllChannels()

  if (!channels) {
    return <Typography>No channels added yet</Typography>
  }

  return (
    <section className="flex flex-col justify-center items-center min-h-screen pt-[var(--header-height)]">
      <div className="fixed top-[var(--header-height)] z-50 w-full">
        <MarqueeWrapper />
      </div>

      <Grid className="grid-cols-4 gap-4 justify-center items-center">
        {channels.items.map((channel) => (
          <Link
            href={`/channel/${channel.id}`}
            key={channel.id}
            className="flex items-center space-x-[6px]"
          >
            <Typography>{channel.name}</Typography>
          </Link>
        ))}
      </Grid>
    </section>
  )
}
