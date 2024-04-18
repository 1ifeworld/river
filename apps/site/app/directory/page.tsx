import { Typography, Grid } from '@/design-system'
import { getMostRecentChannels } from '@/gql'
import Link from 'next/link'
import { MarqueeWrapper } from '@/server'
import { getAllFields } from 'lib/username'
import { UserChannelToggle } from '@/client'

export default async function Directory({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  let channels
  let users

  if (searchParams.view === 'user') {
    // Fetch user data if the view is set to 'user'
    users = await getAllFields({ field: 'name' })
  } else {
    // Fetch channel data by default or if the view is set to anything else
    const data = await getMostRecentChannels()
    channels = data.channels
  }

  if (!channels && !users) {
    return <Typography>No channels or users available</Typography>
  }

  if (channels) {
    channels.sort((a, b) => a.name.localeCompare(b.name))
  }
  if (users) {
    users.sort((x: string, y: string) => x.localeCompare(y))
  }

  return (
    <section className="flex flex-col justify-center items-center min-h-screen pt-[var(--header-height)]">
      <div className="fixed top-[var(--header-height)] z-50 w-full">
        <MarqueeWrapper />
      </div>
      <UserChannelToggle />
      {channels && (
        <Grid className="grid-cols-2 md:grid-cols-4 gap-1 gap-x-10 py-6 p-0 justify-center items-center">
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
      )}
      {users && (
        <Grid className="grid-cols-4 gap-1 gap-x-10 py-6 justify-center items-center">
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
      )}
    </section>
  )
}
