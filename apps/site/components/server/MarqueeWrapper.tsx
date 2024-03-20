import { Marquee } from '@/client'
import { getMarqueeData } from '@/gql'

export async function MarqueeWrapper() {
  const { users, channels, items } = await getMarqueeData()

  console.log('num channels: ', channels)

  return (
    <Marquee
      totalChannels={channels?.items?.[0]?.counter ?? 0}
      totalItems={items?.items?.[0]?.counter ?? 0}
      totalUsers={users?.items?.[0]?.counter ?? 0}
    />
  )
}
