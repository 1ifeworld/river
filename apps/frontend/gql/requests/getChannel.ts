import sdk from '../client'

export async function getChannel({ channel }: { channel: string }) {
  const { channels } = await sdk.channel({ channel })

  return {
    channels,
  }
}
