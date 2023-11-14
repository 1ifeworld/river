import sdk from '../client'

// TODO: This should get moved to our scrypt package as a constant.
const publicationSchema =
  '0xf36f2f0432f99ea34a360f154cea9d1fad45c7319e27aded55cc0d28d0924068'

export async function getUserPublications({ userId }: { userId: bigint }) {
  const publications = await sdk.UserPublications({
    schema: publicationSchema,
    userId: userId,
  })

  return {
    publications: publications.nodes,
  }
}
