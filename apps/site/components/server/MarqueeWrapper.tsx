import { Marquee } from '@/client'
import { getAllChannels, getAllUsers, getAllItems } from '@/gql'

export async function MarqueeWrapper() {
  // Channels
  const { channels } = await getAllChannels()
  const totalChannels = channels?.items?.length

  // Items
  const { items } = await getAllItems()
  const totalItems = items?.items?.length

  // Users
  const { users } = await getAllUsers()
  const totalUsers = users?.items?.length

  return (
    <Marquee
      totalChannels={totalChannels}
      totalItems={totalItems}
      totalUsers={totalUsers}
    />
  )
}
