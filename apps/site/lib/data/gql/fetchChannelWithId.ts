import { client } from './client'

export async function fetchChannelWithId({ id }: { id: number }) {

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

      channelWithId: channelWithId.channel,
    }
}
