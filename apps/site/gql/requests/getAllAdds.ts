import { cache } from 'react'
import sdk from '../client'

export const getAllAdds = cache(async () => {
  const response = await sdk.allAdds()

  return {
    adds: response.addss,
  }
})
