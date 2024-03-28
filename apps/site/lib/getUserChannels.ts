import { getAllChannelsWithRid } from '@/gql'
import { getAddsMetadata, getUsername } from '@/lib'
import { USER_ID_ZERO } from '@/constants'
import { sortChannels } from '@/utils'

export async function getUserChannels(rid: bigint) {
  try {
    // fetch channels
    const { channels } = await getAllChannelsWithRid({
      userId: rid,
    })
    if (!channels?.items) return
    // drill into channels
    const extractedChannels = channels.items.map((channel) => {
      return channel.channel
    })
    // sort channels
    // @ts-ignore
    const sortedChannels = sortChannels(extractedChannels)
    // @ts-ignore
    // fetch usernames for channels
    const usernames = await Promise.all(
      sortedChannels.map((channel) =>
        getUsername({
          id: channel.createdById,
        }),
      ),
    )
    // fetch item metadata for channel mosaics
    // biome-ignore lint:
    const allAdds = sortedChannels.map((channel: any) => {
      const last4 = (channel.adds?.items ?? [])
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

    const processedChannels = sortedChannels.map((channel, index) => {
      return {
        channel: {
          ...channel,
          creatorUsername: usernames[index],
          activeMembers: !channel?.roles?.items
            ? 0
            : channel?.roles?.items.filter(
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
