import type { Channel } from '@/gql'

export function sortChannels(channels: Channel[]) {
  channels.sort((a, b) => {
    // Check if 'adds' array exists and has at least one item
    if (a.adds?.items?.length && b.adds?.items?.length) {
      // Compare timestamps of the first item in the 'adds' array
      return b.adds.items[0].timestamp - a.adds.items[0].timestamp
    } else if (a.adds?.items?.length) {
      // 'b' has no adds, so 'a' should come first
      return -1
    } else if (b.adds?.items?.length) {
      // 'a' has no adds, so 'b' should come first
      return 1
    } else {
      // Neither 'a' nor 'b' has any adds, maintain current order
      return 0
    }
  })
  return channels
}
