import { Stack, Typography } from '@/design-system'
import { type Channel } from '@/gql'
import { getUsername } from '@/lib'

export async function ChannelCard({ channel }: { channel: Channel }) {
  const username = await getUsername({ id: channel.createdByID })

  return (
    <Stack className="border px-3 py-5 justify-between aspect-square">
      {/* Channel Name */}
      <Typography>{channel.uri?.name}</Typography>
      {/* Channel Owner */}
      {/* <Typography>{username}</Typography> */}
      {/* Number of Items */}
      {channel.items.length === 0 ? (
        <Typography className="text-secondary-foreground">0 items</Typography>
      ) : (
        <Typography className="text-secondary-foreground">{`${
          channel.items.length
        } ${channel.items.length > 1 ? 'items' : 'item'}`}</Typography>
      )}
    </Stack>
  )
}
