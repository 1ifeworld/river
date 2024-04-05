import sdk from '../client'
import { unstable_cache } from 'next/cache'

export const getAllAdds = unstable_cache(
  async ({ limit, after }: { limit: number; before?: string, after?: string }) => {
    const response = await sdk.allAdds({ limit, before, after })

    return {
      adds: response.addss,
      pageInfo: response?.addss?.pageInfo,
    }
  },
  ['allAdds'],
)
