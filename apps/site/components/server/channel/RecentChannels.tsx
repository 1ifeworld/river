import { Stack, Typography, Public } from '@/design-system'
import { type ChannelRoles, getMostRecentChannels } from '@/gql'
import { USER_ID_ZERO } from '@/constants'
import Link from 'next/link'

// biome-ignore lint: Unexpected any. Specify a different type.
function sort(channels: any[]) {
  channels.sort((a, b) => {
    // Check if 'adds' array exists and has at least one item
    if (a.adds?.items?.length && b.adds?.items?.length) {
      // Compare timestamps of the first item in the 'adds' array
      return b.adds.items[0].timestamp - a.adds.items[0].timestamp
    } else if (a.adds?.items?.length) {
      // 'b' has no adds, so 'a' should come first
      return -1
    } else if (b.adds?.items?.length) {
      // 'a' has no adds, so 'b' should come first
      return 1
    } else {
      // Neither 'a' nor 'b' has any adds, maintain current order
      return 0
    }
  })
  return channels
}

export async function RecentChannels({
  params,
}: {
  params: { id: string }
}) {
  const { channels } = await getMostRecentChannels()

  if (!channels) {
    return <Typography>Error fetching channels</Typography>
  }

  const sortedChannels = sort(channels)

  function checkIsPublic({ roleData }: { roleData: ChannelRoles[] }) {
    for (let i = 0; i < roleData.length; ++i) {
      if (roleData[i].rid === USER_ID_ZERO && roleData[i].role > 0) return true
    }
    return false
  }

  return (
    <Stack className="hidden md:flex gap-y-[34px]">
      <Typography className="font-medium">Recent channels</Typography>
      <Stack className="gap-y-[3px]">
        {/* @ts-ignore */}
        {sortedChannels.slice(0, 50).map((channel) => {
          // @ts-ignore
          const isPublic = checkIsPublic({ roleData: channel?.roles?.items })
          return (
            <Link
              className="flex items-center space-x-[6px]"
              href={`/channel/${channel.id}`}
              key={channel.timestamp}
            >
              <Typography
                className={`hover:underline underline-offset-2 transition-all truncate ${
                  channel?.id === params?.id ? 'underline' : ''
                }`}
              >
                {channel?.name || '--'}
              </Typography>
              {isPublic && <Public />}
            </Link>
          )
        })}
      </Stack>
    </Stack>
  )
}
