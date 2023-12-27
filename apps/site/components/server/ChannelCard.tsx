import { Stack, Typography, Flex } from '@/design-system'

import { getUsername, type AllChannelsResponse } from '@/lib'
import { pluralize } from '@/utils'
import Link from 'next/link'

export async function ChannelCard({
  channel,
  metadata,
}: {
  channel: any
  metadata: any
}) {
  const username = await getUsername({ id: channel.createdBy })
  const channelMetadata = metadata.data[channel.uri as string]

  return (
    <Link href={`/channel/${channel.id}`}>
      <Stack className="border px-3 py-5 justify-between aspect-square hover:bg-primary/[0.025] transition-all">
        {/* Channel name */}
        <Typography>{channelMetadata?.name ?? 'untitled'}</Typography>
        <Flex>
          {/* Channel owner */}
          <Typography className="text-secondary-foreground">
            {username ?? ''}
          </Typography>
          <span className="text-secondary-foreground">{'·'}</span>
          {/* Number of items */}
          <Typography className="text-secondary-foreground">
            {pluralize(channel.references.length, 'item', 'items')}
          </Typography>
        </Flex>
      </Stack>
    </Link>
  )
}
