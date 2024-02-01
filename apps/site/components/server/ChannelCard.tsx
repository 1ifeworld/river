import { Channel } from '@/gql'
import { kv } from '@vercel/kv'
import { type ChannelMetadata } from '@/lib'
import { Typography, Stack, Flex } from '@/design-system'
import Link from 'next/link'

export async function ChannelCard({ channel }: { channel: Channel }) {
  const channelMetadata = await kv.get<ChannelMetadata>(channel.uri)

  return (
    <Stack className="w-fit gap-y-1">
      <Link href={`/channel/${channel.id}`}>
        <Stack className="aspect-square w-64 bg-[#E9E9E9] justify-center items-center text-center px-4">
          <Typography className="text-secondary-foreground">
            {channelMetadata?.description || '--'}
          </Typography>
        </Stack>
      </Link>
      <Flex className="justify-between items-center">
        <Link
          href={`/channel/${channel.id}`}
          className="hover:underline underline-offset-2 transition-all"
        >
          <Typography>{channelMetadata?.name}</Typography>
        </Link>
        <Typography>{'--'}</Typography>
      </Flex>
    </Stack>
  )
}
