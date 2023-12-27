import { client } from './client'

export async function fetchReferenceWithId({ userId }: { userId: string }) {
  try {
    const referenceWithId = await client.query({
      reference: {
        __args: {
          id: userId,
        },
        id: true,
        createdTimestamp: true,
        createdBy: true,
        channelId: true,
        pubRef: {
          id: true,
          createdTimestamp: true,
          createdBy: true,
          uri: true,
        },
        channel: {
          id: true,
          createdTimestamp: true,
          createdBy: true,
          uri: true,
          members: true,
          admins: true,
          references: {
            __args: {
              orderBy: 'id',
              orderDirection: 'desc',
            },
            id: true,
            createdTimestamp: true,
            createdBy: true,
          },
        },
      },
    })
    return {
      success: true,
      data: referenceWithId.reference,
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      data: null,
    }
  }
}
