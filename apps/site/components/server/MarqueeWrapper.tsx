import { Marquee } from '@/client'
import { getMarqueeData } from '@/gql'

export async function MarqueeWrapper() {
  const { users, channels, items } = await getMarqueeData()
  return (
    <Marquee
      totalChannels={channels?.items?.[0].counter}
      totalItems={items?.items?.[0].counter}
      totalUsers={users?.items?.[0].counter}
    />
  )
}
