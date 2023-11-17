import sdk from '../client'

export async function getAllActivity() {
  const response = await sdk.allActivity({})

  const { channels, publications } = response

  return {
    channels: channels ?? [],
    publications: publications ?? [],
  }
}
