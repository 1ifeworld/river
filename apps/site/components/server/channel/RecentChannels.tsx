import { Stack, Typography } from '@/design-system'
import { getAllChannels } from '@/gql'
import { getChannelMetadata } from '@/lib'
import Link from 'next/link'

export async function RecentChannels({
  params,
}: {
  params: { id: string }
}) {
  const { channels } = await getAllChannels()

  if (!channels?.items) {
    return <Typography>Error fetching channels</Typography>
  }

  return (
    <Stack className="hidden md:flex gap-y-[34px]">
      <Typography className="font-medium">Recent channels</Typography>
      <Stack className="gap-y-[5px]">
        {channels.items.slice(0, 50).map((channel) => {
          return (
            <Link href={`/channel/${channel.id}`} key={channel.timestamp}>
              <Typography
                className={`hover:underline underline-offset-2 transition-all truncate ${
                  channel?.id === params?.id ? 'underline' : ''
                }`}
              >
                {channel?.name || '--'}
              </Typography>
            </Link>
          )
        })}
      </Stack>
    </Stack>
  )
}
