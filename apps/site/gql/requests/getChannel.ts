import { ChannelWithHashQuery } from '../sdk.generated'
import sdk from '../client'

export async function getChannel({
  hashId,
}: { hashId: string }): Promise<ChannelWithHashQuery> {
  const channel = await sdk.ChannelWithHash({
    hashId: hashId,
  })

  return channel
}
