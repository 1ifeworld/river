import sdk from '../client'
import { unstable_cache } from 'next/cache'

export const getAllAdds = 
// unstable_cache(
    async () => {
  const response = await sdk.allAdds()

  console.log("response from all sdk.allAdds", response)

  return {
    adds: response.addss,
  }
}
// , ['allAdds'])
