import { cache } from 'react'
import sdk from '../client'

export const getChannelsByUser = async (userId: string) => {
  const response = await sdk.channelsByUser({ userId })

  return {
    channels: response.channels,
  }
}
