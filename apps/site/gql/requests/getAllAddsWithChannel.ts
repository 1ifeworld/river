import sdk from '../client'
import { unstable_cache } from 'next/cache'

export const getAllAddsWithChannel = unstable_cache(
  async ({ channelId }: { channelId: string }) => {
    const aggResponse = []
    let hasNextPage = true
    let endCursor = null

    while (hasNextPage) {
      const response = await sdk.allAddsWithChannel({
        channelId: channelId,
        endCursor: endCursor,
      })

      if (response.addss?.items) {
        aggResponse.push(...response.addss.items)
      }

      if (response.addss?.pageInfo) {
        hasNextPage = response.addss.pageInfo.hasNextPage
        endCursor = response.addss.pageInfo.endCursor
      } else {
        // Set hasNextPage to false if pageInfo is missing
        // for some reason to avoid infinite loop
        hasNextPage = false
      }
    }

    return {
      adds: aggResponse,
    }
  },
  ['allAddsWithChannel'],
)
