import sdk from '../client'
import { unstable_cache } from 'next/cache'

export const getAllUsers = unstable_cache(async () => {
  const response = await sdk.allUsers()

  return {
    users: response.users,
  }
}, ['allUsers'])
