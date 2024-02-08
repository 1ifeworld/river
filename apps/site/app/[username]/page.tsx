import { Stack, Typography, Flex, Grid, Separator } from '@/design-system'
import { ChannelCard } from '@/server'
import { getDataForUsername } from '@/lib'
import { getChannelsItemsWithUser } from '@/gql'
import { pluralize } from '@/utils'

export default async function Profile({
  params,
}: {
  params: { username: string }
}) {
  // Saturn's service worker is served at the root of the domain
  // avoid fetching username data when the following is a supplied param
  if (params.username === 'saturn-sw.js') return

  const userData = await getDataForUsername({ username: params.username })

  const { channels, items } = await getChannelsItemsWithUser({
    userId: userData.id,
  })

  console.log("channels", channels)

  return (
    <Stack className="gap-y-8">
      <Stack className="gap-y-[3px]">
        <Typography>{params.username}</Typography>
        <Typography className="text-secondary-foreground">
          {pluralize(channels?.items?.length as number, 'channel', 'channels')},{' '}
          {pluralize(items?.items?.length as number, 'item', 'items')}
        </Typography>
      </Stack>
      <Stack className="gap-y-[15px]">
        <Flex className="gap-x-4 items-center">
          <Typography>Channels</Typography>
          {/* TODO: Display created items */}
          <Typography className="text-secondary-foreground opacity-0">
            Items
          </Typography>
        </Flex>
        {/* Channels */}
        <Grid className="grid-cols-2 md:grid-cols-[repeat(auto-fill,_minmax(255px,_1fr))] gap-5">
          {channels?.items?.map((channel, index: number) => (
            // @ts-ignore
            <ChannelCard channel={channel} />
          ))}
        </Grid>
      </Stack>
    </Stack>
  )
}
