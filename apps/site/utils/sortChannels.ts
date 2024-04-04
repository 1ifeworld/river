import type { Channel } from '@/gql'

export function sortChannels(channels: Channel[]) {
  channels.sort((a, b) => {
    // set default times for channel A + B
    let channelA = a.timestamp
    let channelB = b.timestamp
    // Check for recent add time override for channel A + B
    if (a.adds?.items?.length !== 0 && a.adds?.items?.[0]?.timestamp) {
      let override = a.adds.items[0].timestamp;
      if (override > channelA) {
        channelA = override;
      }
    }
    if (b.adds?.items?.length !== 0 && b.adds?.items?.[0]?.timestamp) {
      let override = b.adds.items[0].timestamp;
      if (override > channelB) {
        channelB = override;
      }
    }
    // Compare the most relevant recent dates of channels A and B
    return channelB - channelA
  })

  return channels
}
