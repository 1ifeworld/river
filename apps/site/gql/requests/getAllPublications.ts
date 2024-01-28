import { cache } from 'react'
import sdk from '../client'

export const getAllPublications = cache(async () => {
  const response = await sdk.allPublications()

  return {
    publications: response.publications,
  }
})
