import Link from 'next/link'
import { Stack, Typography, Public } from '@/design-system'
import { getMostRecentChannels, type ChannelRoles } from '@/gql'
import { USER_ID_ZERO } from '@/constants'
import { sortChannels } from '@/utils'

function checkIsPublic({ roleData }: { roleData: ChannelRoles[] }) {
  for (let i = 0; i < roleData.length; ++i) {
    if (roleData[i].rid === USER_ID_ZERO && roleData[i].role > 0) return true
  }
  return false
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

  // @ts-ignore
  const sortedChannels = sortChannels(channels)

  return (
    <Stack className="hidden md:flex gap-y-[34px]">
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
