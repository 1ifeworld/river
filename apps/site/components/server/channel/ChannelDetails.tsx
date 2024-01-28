import { Stack, Typography } from '@/design-system'
import { type Channel } from '@/gql'
import { pluralize, unixTimeConverter } from '@/utils'

export async function ChannelDetails({ channel }: { channel: Channel }) {
  return (
    <Stack className="py-8 ml-2">
      {/* Number of items */}
      <Typography className="text-secondary-foreground">
        {pluralize(channel.references.length, 'item', 'items')}
      </Typography>
      {/* Channel creation date */}
      <Typography className="text-secondary-foreground">
        Channel created {unixTimeConverter(channel.createdTimestamp)}
      </Typography>
    </Stack>
  )
}
