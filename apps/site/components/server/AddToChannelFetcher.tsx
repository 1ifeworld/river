import { getAllChannelsWithRid, type Item, getChannelsForItem } from '@/gql'
import { ChannelCard } from '@/server'
import { Grid, Typography } from '@/design-system'

export async function AddToChannelFetcher({ userId }: { userId: bigint }) {
  const { channels } = await getAllChannelsWithRid({
    userId,
  })

  // TODO: add once codegen is fixed
  //   const { channels: channelsForItem } = await getChannelsForItem({
  //     id: item.id,
  //   })

  return (
    <Grid className="grid-cols-2 md:grid-cols-[repeat(auto-fill,_minmax(255px,_1fr))] gap-5">
      {channels?.items?.map((channel, index: number) => (
        // @ts-ignore
        <ChannelCard channel={channel.channel} />
      ))}
    </Grid>
  )
}
