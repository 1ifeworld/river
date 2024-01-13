import { Typography, Stack } from '@/design-system'
import { getAllChannels } from '@/gql'
import { getChannelMetadata } from '@/lib'
import Link from 'next/link'

export async function AllChannelsList({
  params,
}: {
  params: { id: string }
}) {
  const { channels } = await getAllChannels()
  const { metadata } = await getChannelMetadata(channels)

  if (!channels || !metadata) {
    return <Typography>Error fetching channels</Typography>
  }

  return (
    <Stack className="hidden md:flex gap-6 max-w-[192px]">
      <Typography className="underline underline-offset-2">
        All Channels
      </Typography>
      <div>
        {channels.map((channel) => {
          const channelMetadata = metadata.data[channel.uri as string]
          return (
            <Link href={`/channel/${channel.id}`}>
              <Typography
                className={`leading-1 text-nowrap truncate hover:underline underline-offset-2 transition-all ${
                  channel?.id === params.id ? 'underline' : ''
                }`}
                key={channel.createdTimestamp}
              >
                {channelMetadata?.name}
              </Typography>
            </Link>
          )
        })}
      </div>
    </Stack>
  )
}
