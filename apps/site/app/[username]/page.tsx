import { Button, Flex, Grid, Stack, Typography } from '@/design-system'
import { getChannelsItemsWithUser } from '@/gql'
import { getDataForUsername } from '@/lib'
import { ChannelCard } from '@/server'
import { pluralize, sortChannels } from '@/utils'
import { ChannelDialog, NewChannelTrigger, UserSettings } from '@/client'
import { Suspense } from 'react'

export default async function Profile({
  params,
}: {
  params: { username: string }
}) {
  const userData = await getDataForUsername({ username: params.username })
  let channels
  let items

  if (userData) {
    const { channels: channelsResp, items: itemsResp } =
      await getChannelsItemsWithUser({
        userId: userData.id.toString(),
      })
    channels = channelsResp
    items = itemsResp
  }

  // @ts-ignore
  const sortedChannels = channels?.items ? sortChannels(channels.items) : []

  return (
    <Stack className="gap-y-8">
      <Stack className="gap-y-[3px]">
        <Flex className="gap-x-2 items-center">
          <Typography>{params.username}</Typography>
          <UserSettings profileUsername={params.username} />
        </Flex>
        <Suspense fallback={<p>Loading profile data...</p>}>
          <Typography className="text-secondary-foreground">
            {pluralize(sortedChannels.length as number, 'channel', 'channels')},{' '}
            {pluralize(items?.items?.length as number, 'item', 'items')}
          </Typography>
        </Suspense>
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
        <Suspense fallback={<p>Loading channel cards...</p>}>
          <Stack className="md:hidden gap-[10px]">
            <ChannelDialog trigger={<NewChannelTrigger />} hideTrigger={true} />
            {sortedChannels.map((channel, index: number) => (
              // @ts-ignore
              <ChannelCard channel={channel} width={64} />
            ))}
          </Stack>
        </Suspense>
        {/* desktop view  */}
        <Suspense fallback={<p>Loading channel cards...</p>}>
          <Grid className="hidden md:grid grid-cols-2 md:grid-cols-[repeat(auto-fill,_minmax(255px,_1fr))] gap-5">
            <ChannelDialog trigger={<NewChannelTrigger />} hideTrigger={true} />
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
        </Suspense>
      </Stack>
    </Stack>
  )
}
