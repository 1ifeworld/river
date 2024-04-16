import { Stack, Typography, Grid } from '@/design-system'
import { getMostRecentChannels } from '@/gql'
import Link from 'next/link'
import { MarqueeWrapper } from '@/server'
import { getAllFields } from 'lib/username'



export default async function Directory() {
  const { channels } = await getMostRecentChannels()
  const users = await getAllFields({field: 'name'})

  if (!channels) {
    return <Typography>No channels added yet</Typography>
  }

  channels.sort((a, b) => a.name.localeCompare(b.name))
  users.sort((x: string, y: string) => x.localeCompare(y)) 

  return (
    <section className="flex flex-col justify-center items-center min-h-screen pt-[var(--header-height)]">
      <div className="fixed top-[var(--header-height)] z-50 w-full">
        <MarqueeWrapper />
      </div>
      <Grid className="grid-cols-4 gap-4 p-20 justify-center items-center">
        {channels.map((channel) => (
          <Link
            href={`/channel/${channel.id}`}
            key={channel.id}
            className="flex items-center space-x-[6px]"
          >
            <Typography>{channel.name}</Typography>
          </Link>
        ))}
      </Grid>
      <Grid className="grid-cols-4 gap-4 p-20 justify-center items-center">
  {users.map((user: string) => (
    <a
      href={`/${user}`}
      key={user}
      className="flex items-center space-x-[6px]"
      >
      <Typography>{user}</Typography>
    </a>
  ))}
</Grid>
    </section>
  )
}

