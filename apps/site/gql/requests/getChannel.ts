import sdk from '../client'

export async function getChannel({ hashId }: { hashId: string }) {
  const channel = await sdk.ChannelWithHash({
    hashId: hashId
  })

  return {
    channel: channel.channels
  }
}