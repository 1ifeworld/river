import sdk from '../client'
import { unstable_noStore as noStore } from 'next/cache'

export async function getAllChannels() {
  // `noStore()` here prevents the response from being cached
  noStore()
  const response = await sdk.allChannels()

  return {
    channels: response.channels,
  }
}
