import { client } from './client'

export async function fetchAllChannels() {
  try {
    const allChannels = await client.query({
      channels: {
        __args: {
          orderBy: 'id',
          orderDirection: 'desc',
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
          channelId: true,
          pubRefId: true,
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
      data: allChannels.channels,
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      data: null,
    }
  }
}
