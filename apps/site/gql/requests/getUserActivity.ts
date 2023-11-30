import sdk from '../client'

export async function getUserActivity() {
  const response = await sdk.userActivity()

  return {
    channels: response.channels,
    items: response.items
  }
}
