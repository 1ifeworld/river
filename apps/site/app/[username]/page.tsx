import { Stack, Typography, Flex, Grid, Separator } from '@/design-system'
import { ChannelCard } from '@/server'
import { getDataForUsername } from '@/lib'
import { getChannelsByUser } from '@/gql'
import { pluralize } from '@/utils'

export default async function Profile({
  params,
}: {
  params: { username: string }
}) {
  const userData = await getDataForUsername({ username: params.username })

  const { channels } = await getChannelsByUser(userData.id)

  return (
    <Stack className="gap-y-8 pt-[38px] px-5 pb-8">
      <div>
        <Typography>{params.username}</Typography>
        {/* TODO: Display number of items */}
        <Typography className="text-secondary-foreground">
          {pluralize(channels.length, 'channel', 'channels')}
        </Typography>
      </div>
      <Separator />
      <Flex className="gap-x-4 items-center">
        <Typography>Channels</Typography>
        {/* TODO: Display created items */}
        <Typography className="text-secondary-foreground opacity-0">
          Items
        </Typography>
      </Flex>
      {/* Channels */}
      <Grid className="grid-cols-1 md:grid-cols-[repeat(auto-fill,_minmax(256px,_1fr))] gap-5">
        {channels.map((channel, index: number) => (
          // @ts-ignore
          <ChannelCard channel={channel} />
        ))}
      </Grid>
    </Stack>
  )
}
