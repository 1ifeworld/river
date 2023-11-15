import sdk from '../client'
import { publicationSchema } from 'scrypt'

export async function getUserPublications({ userId }: { userId: bigint }) {
  const publications = await sdk.UserPublications({
    schema: publicationSchema,
    userId: userId,
  })

  return {
    publications: publications.nodes,
  }
}
