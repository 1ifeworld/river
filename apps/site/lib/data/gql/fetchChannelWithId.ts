import { client } from './client'
import { unstable_noStore } from 'next/cache'

export async function fetchChannelWithId({ id }: { id: number }) {
  unstable_noStore()
  try {
    const channelWithId = await client.query({
      channel: {
        __args: {
          id: id,
        },
        id: true,
        createdTimestamp: true,
        createdBy: true,
        uri: true,
        admins: true,
        members: true,
        references: {
          __args: {
            orderBy: 'id',
            orderDirection: 'desc',
          },
          id: true,
          createdTimestamp: true,
          createdBy: true,
          pubRef: {
            id: true,
            createdTimestamp: true,
            createdBy: true,
            uri: true,
          },
        },
      },
    })

    return {
      success: true,
      data: channelWithId.channel,
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      data: null,
    }
  }
}
