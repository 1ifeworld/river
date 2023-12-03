import { Stack, Typography, Flex } from '@/design-system'
import { type Channel } from '@/gql'
import { getUsername } from '@/lib'
import { pluralize, fetchIpfsData } from '@/utils'
import Link from 'next/link'

export async function ChannelCard({ channel }: { channel: Channel }) {
  const username = await getUsername({ id: channel.creatorId })
  const channelUriIpfsResponse = await fetchIpfsData(channel.uri as string)

  if (!channelUriIpfsResponse) {
    return (
      <Stack className="border px-3 py-5 justify-between aspect-square hover:bg-primary/[0.025] transition-all">
        {/* Channel Name */}
        <Typography>{'failed to fetch channel data'}</Typography>
        <Flex>
          {/* Channel Owner */}
          <Typography className="text-secondary-foreground">{''}</Typography>
          <span className="text-secondary-foreground">{'·'}</span>
          {/* Number of Items */}
          <Typography className="text-secondary-foreground">{''}</Typography>
        </Flex>
      </Stack>
    )
  }

  return (
    <Link href={`/channel/${channel.id}`}>
      <Stack className="border px-3 py-5 justify-between aspect-square hover:bg-primary/[0.025] transition-all">
        {/* Channel Name */}
        <Typography>{channelUriIpfsResponse.name}</Typography>
        <Flex>
          {/* Channel Owner */}
          <Typography className="text-secondary-foreground">
            {username ?? ''}
          </Typography>
          <span className="text-secondary-foreground">{'·'}</span>
          {/* Number of Items */}
          <Typography className="text-secondary-foreground">
            {pluralize(channel.items.length, 'item', 'items')}
          </Typography>
        </Flex>
      </Stack>
    </Link>
  )
}
