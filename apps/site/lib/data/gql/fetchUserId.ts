import { client } from './client'

export async function fetchUserId({
  custodyAddress,
}: { custodyAddress: string }) {
  try {
    const userId = await client.query({
      user: {
        __args: {
          id: custodyAddress,
        },
        userId: true,
      },
    })
    return {
      success: true,
      data: userId.user,
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      data: null,
    }
  }
}
