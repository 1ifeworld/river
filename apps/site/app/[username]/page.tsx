import { Flex, Grid, Separator, Stack, Typography } from '@/design-system'
import { getChannelsItemsWithUser } from '@/gql'
import { getDataForUsername } from '@/lib'
import { ChannelCard } from '@/server'
import { pluralize, sortChannels } from '@/utils'

export default async function Profile({
  params,
}: {
  params: { username: string }
}) {
  const userData = await getDataForUsername({ username: params.username })

  const { channels, items } = await getChannelsItemsWithUser({
    userId: userData.id,
  })

  console.log("initial fetch on profile page is good")
  // console.log("whats going into sort channels that could be causing this", channels?.items)

  // @ts-ignore
  const sortedChannels = sortChannels(channels?.items)

  console.log("made it pasted sorted channels ok without things breaking")

  return (
    <Stack className="gap-y-8">
      <Stack className="gap-y-[3px]">
        <Typography>{params.username}</Typography>
        <Typography className="text-secondary-foreground">
          {pluralize(sortedChannels.length as number, 'channel', 'channels')},{' '}
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
        {/* mobile view */}
        <Stack className="md:hidden gap-[10px]">
          {sortedChannels.map((channel, index: number) => (
            // @ts-ignore
            <ChannelCard channel={channel} width={64} />
          ))}
        </Stack>
        {/* desktop view  */}
        <Grid className="hidden md:grid grid-cols-2 md:grid-cols-[repeat(auto-fill,_minmax(255px,_1fr))] gap-5">
          {sortedChannels.map((channel, index: number) => (
            <ChannelCard
              // @ts-ignore
              channel={channel}
              width={256}
              // @ts-ignore
              quality={100}
              orientation={1}
            />
          ))}
        </Grid>
      </Stack>
    </Stack>
  )
}
