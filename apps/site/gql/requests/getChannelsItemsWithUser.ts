import sdk from '../client'

export async function getChannelsItemsWithUser({ userId }: { userId: string }) {
  const response = await sdk.channelsItemsWithUser({
    userId: BigInt(userId),
  })

  return { channels: response.channels, items: response.items }
}
