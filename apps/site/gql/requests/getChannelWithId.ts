import sdk from '../client'

export async function getChannelWithId({ id }: { id: string }) {
  const response = await sdk.channelWithId({
    id: id,
  })

  return { channel: response.channel }
}
