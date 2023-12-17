import sdk from '../client'

export async function getAllUserIds() {
  const response = await sdk.allUserIds()

  return {
    userIds: response.users,
  }
}
