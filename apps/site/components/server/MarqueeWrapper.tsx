import { Marquee } from '@/client'
import { getMarqueeData } from '@/gql'
import { getAddsMetadata, getUsername } from '@/lib'

export type Action = {
  userName: string
  itemName: string
  channelName: string
  channelId: string
  channelIndex: number
}

export async function MarqueeWrapper() {
  let marqueeActions: Action[] = []
  const { data } = await getMarqueeData()

  if (data) {
    //  fetch usernames for adds
    const usernames = await Promise.all(
      data.map((add) =>
        getUsername({
          id: add.addedById,
        }),
      ),
    )

    // fetch metadata for items
    // @ts-ignore
    const { metadata } = await getAddsMetadata(data)
    marqueeActions = data
      .map((add, index) => {
        if (add.removed) return null
        const itemMetadata = metadata.data[add.item.uri]
        return {
          userName: usernames[index],
          itemName: itemMetadata?.name ?? 'untitled',
          channelName: data[index].channel.name,
          channelId: data[index].channel.id,
          channelIndex: data[index].channelIndex,
        }
      })
      .filter((action): action is Action => action !== null)
  }
  return <Marquee actions={marqueeActions} />
}
