import { Typography, Grid, Flex, Stack, Public } from '@/design-system'
import { getMostRecentChannels } from '@/gql'
import type { Channel, ChannelRoles } from '@/gql'
import { USER_ID_ZERO } from '@/constants'
import Link from 'next/link'
import { MarqueeWrapper } from '@/server'
import { getAllFields } from 'lib/username'
import { UserChannelToggle } from '@/client'

export default async function Directory({
  searchParams,
}: {
  params: { channel: Channel }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  let channels
  let users

  if (searchParams.view === 'user') {
    users = await getAllFields({ field: 'name' })
  } else {
    const data = await getMostRecentChannels()
    channels = data.channels
  }

  if (channels) {
    channels.sort((a, b) => a.name.localeCompare(b.name))
  }
  if (users) {
    users.sort((x: string, y: string) => x.localeCompare(y))
  }

  function checkIsPublic({ roleData }: { roleData: ChannelRoles[] }) {
    for (let i = 0; i < roleData.length; ++i) {
      if (roleData[i].rid === USER_ID_ZERO && roleData[i].role > 0) return true
    }
    return false
  }

  return (
    <div className="pt-[104px]">
      <div className="fixed top-[var(--header-height)] z-50 w-full">
        {/* <MarqueeWrapper /> */}
      </div>
      <Flex className="px-5 pb-5 gap-y-[60px] flex-col md:flex-row md:gap-none">
        <div className="md:w-[19%] md:block">
          <Stack className="gap-y-[30px]">
            <Typography>Filter</Typography>
            <UserChannelToggle />
          </Stack>
        </div>
        <div className="w-full md:w-[78%]">
          {channels && (
            <Grid className="grid-cols-1 md:grid-cols-4 gap-y-[3px]">
              {channels.map((channel) => {
                // Check public status for each channel
                const isChannelPublic = !channel?.roles?.items
                  ? false
                  : checkIsPublic({
                      roleData: channel.roles.items as ChannelRoles[],
                    })

                return (
                  <Link
                    href={`/channel/${channel.id}`}
                    key={channel.id}
                    className="hover:underline underline-offset-2 transition-all decoration-primary-foreground"
                  >
                    <Flex className="items-center space-x-[6px]">
                      <Typography>{channel.name}</Typography>
                      {isChannelPublic && <Public />}
                    </Flex>
                  </Link>
                )
              })}
            </Grid>
          )}
          {users && (
            <Grid className="grid-cols-1 md:grid-cols-4 gap-y-[3px]">
              {users.map((user: string) => (
                <Link
                  href={`/${user}`}
                  key={user}
                  className="hover:underline underline-offset-2 transition-all decoration-primary-foreground"
                >
                  <Typography>{user}</Typography>
                </Link>
              ))}
            </Grid>
          )}
        </div>

        <div className="hidden md:w-[3%] md:block">{}</div>
      </Flex>
    </div>
  )
}
