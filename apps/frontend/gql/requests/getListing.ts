import sdk from '../client'

export async function getListing({ id }: { id: string }) {
  const { listings } = await sdk.listing({ id })

  return {
    listings,
  }
}
