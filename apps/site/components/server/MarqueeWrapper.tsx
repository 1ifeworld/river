import { Marquee } from '@/client'
import { getMarqueeData } from '@/gql'
import { getAddsMetadata } from '@/lib'

export type Action = {
  itemName: string
  actionName: string
  channelName: string
}

export async function MarqueeWrapper() {
  let marqueeActions: Action[] = []
  const { data } = await getMarqueeData()
  if (data) {
    // @ts-ignore
    const { metadata } = await getAddsMetadata(data)
    marqueeActions = data.map((add, index) => {
      const itemMetadata = metadata.data[add.item.uri]
      return {
        itemName: itemMetadata.name,
        actionName: 'added to',
        channelName: data[index].channel.name,
      }
    })
  }
  return <Marquee actions={marqueeActions} />
}
