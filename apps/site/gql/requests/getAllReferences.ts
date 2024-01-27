import { cache } from 'react'
import sdk from '../client'

export const getAllReferences = cache(async () => {
  const response = await sdk.allReferences()

  return {
    references: response.references,
  }
})