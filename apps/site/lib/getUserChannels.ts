import { getAllChannelsWithRid } from '@/gql'
import { getAddsMetadata, getUsername } from '@/lib'
import { USER_ID_ZERO } from '@/constants'

export async function getUserChannels(rid: bigint) {
  try {
    // fetch channels
    const { channels } = await getAllChannelsWithRid({
      userId: rid,
    })
    if (!channels?.items) return
    // fetch usernames for channels
    const usernames = await Promise.all(
      channels.items.map((channel) =>
        getUsername({
          id: channel.channel.createdById,
        }),
      ),
    )
    // generate active member count for channels

    // fetch item metadata for channel mosaics
    // biome-ignore lint:
    const allAdds = channels?.items.map((channel: any) => {
      const last4 = (channel.channel.adds?.items ?? [])
        // biome-ignore lint:
        .filter((item: any) => !item.removed)
        .slice(0, 4)
      return last4
    })
    const allAddsFlat = allAdds.flat()
    // @ts-ignore
    const allAddsMetadata = await getAddsMetadata(allAddsFlat)

    const processedAdds = allAdds.map((addArray) => {
      // biome-ignore lint:
      return addArray.map((add: any) => {
        return {
          add: add,
          itemMetadata: allAddsMetadata.metadata.data[add.item.uri],
        }
      })
    })

    const processedChannels = channels?.items.map((channel, index) => {
      return {
        channel: {
          ...channel.channel,
          creatorUsername: usernames[index],
          activeMembers: !channel?.channel?.roles?.items
            ? 0
            : channel?.channel?.roles?.items.filter(
                (item) =>
                  item.rid !== USER_ID_ZERO && Number.parseInt(item.role) === 1,
              ).length,
        },
        channelItemMetadata: processedAdds[index],
      }
    })

    return processedChannels
  } catch (error) {
    console.error('Error fetching user channels:', error)
  }
}
