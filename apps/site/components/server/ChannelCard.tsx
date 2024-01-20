import { Flex, Stack, Typography } from '@/design-system'
import { type Channel } from '@/gql'
import { getUsername } from '@/lib'
import { pluralize } from '@/utils'
import Link from 'next/link'

export async function ChannelCard({
  channel,
  metadata,
}: {
  channel: Channel
  // biome-ignore lint: allow unspecified type for metadata
  metadata: any
}) {
  const username = await getUsername({ id: channel.createdBy })
  const channelMetadata = metadata.data[channel.uri as string]

  return (
    <Link href={`/channel/${channel.id}`}>
      <Stack className="border px-4 py-3 justify-between aspect-square hover:bg-primary/[0.025] transition-all">
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
