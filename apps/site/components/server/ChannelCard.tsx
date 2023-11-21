import { Stack, Typography, Flex } from '@/design-system'
import { type Channel } from '@/gql'
import { getUsername } from '@/lib'
import { pluralize } from '@/utils'

export async function ChannelCard({ channel }: { channel: Channel }) {
  const username = await getUsername({ id: channel.createdByID })

  return (
    <Stack className="border px-3 py-5 justify-between aspect-square hover:bg-primary/[0.025] transition-all">
      {/* Channel Name */}
      <Typography>{channel.uri?.name}</Typography>
      <Flex>
        {/* Channel Owner */}
        <Typography className="text-secondary-foreground">
          {username?.username ?? ''}
        </Typography>
        <span className="text-secondary-foreground">{'·'}</span>
        {/* Number of Items */}
        <Typography className="text-secondary-foreground">
          {pluralize(channel.items.length, 'item', 'items')}
        </Typography>
      </Flex>
    </Stack>
  )
}
