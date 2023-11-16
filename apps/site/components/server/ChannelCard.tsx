import { Stack, Typography } from '@/design-system'
import { type Node } from '@/gql'
import { getUsername } from '@/lib'

export async function ChannelCard({ channel }: { channel: Node }) {
  //   const username = await getUsername({ id: channel.nodeAdmin })
  return (
    <Stack className="border px-3 py-5 justify-between aspect-square">
      {/* Channel Name */}
      {/* TODO: Replace with decoded message body */}
      <Typography variant="small">Public Space</Typography>
      {/* <Typography>{channel.msgBody}</Typography> */}
      {/* Channel Owner */}
      {/* TODO: Replace with username */}
      <Typography variant="small">{channel.nodeAdmin}</Typography>
      {/* Number of Items */}
      {/* <Typography>{channe;}</Typography> */}
    </Stack>
  )
}
