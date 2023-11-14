import sdk from '../client'

// TODO: This should get moved to our scrypt package as a constant.
const channelSchema =
  '0x1234567890123456789012345678901234567890123456789012345678901234'

export async function getChannels() {
  const channels = await sdk.Nodes({ schema: channelSchema })

  return {
    channels: channels.nodes,
  }
}
