import sdk from '../client'

// TODO: This should get moved to our offchain-schema package as a constant.
const publicationSchema =
  '0xf36f2f0432f99ea34a360f154cea9d1fad45c7319e27aded55cc0d28d0924068'

export async function getPublications() {
  const publications = await sdk.Nodes({ schema: publicationSchema })

  return {
    publications: publications.nodes,
  }
}
