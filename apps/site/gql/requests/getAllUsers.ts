import sdk from '../client'

export const getAllUsers = async () => {
  const response = await sdk.allUsers()

  return {
    users: response.users,
  }
}
