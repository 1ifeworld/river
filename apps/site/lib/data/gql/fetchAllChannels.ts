import { client } from './client'

export async function fetchAllChannels() {
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
    allChannels
    // channels : allChannels.channels,
  }
}

export type AllChannelsResponse = ReturnType<typeof fetchAllChannels>
