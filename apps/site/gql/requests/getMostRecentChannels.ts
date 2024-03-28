import sdk from '../client'
import { unstable_cache } from 'next/cache'

export const getMostRecentChannels = unstable_cache(async () => {
  const aggResponse = []
  let hasNextPage = true
  let endCursor = null

  while (hasNextPage) {
    const response = await sdk.allChannels({
      endCursor: endCursor,
    })

    if (response.channels?.items) {
      aggResponse.push(...response.channels.items)
    }

    if (response.channels?.pageInfo) {
      hasNextPage = response.channels.pageInfo.hasNextPage
      endCursor = response.channels.pageInfo.endCursor
    } else {
      // Set hasNextPage to false if pageInfo is missing
      // for some reason to avoid infinite loop
      hasNextPage = false
    }
  }

  return {
    channels: aggResponse,
  }
}, ['allChannels'])
