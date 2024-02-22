import { Stack, Typography } from '@/design-system'
import { type Channel } from '@/gql'
import { pluralize, unixTimeConverter } from '@/utils'

export async function ChannelDetails({ channel }: { channel: Channel }) {
  const length = channel.adds?.items ? channel.adds?.items.length : 0

  return (
    <Stack className="py-8 md:ml-2 gap-y-[3px]">
      {/* Number of items */}
      <Typography className="text-secondary-foreground">
        {pluralize(length, 'item', 'items')}
      </Typography>
      {/* Channel creation date */}
      <Typography className="text-secondary-foreground">
        Channel created {unixTimeConverter(channel.timestamp)}
      </Typography>
    </Stack>
  )
}
