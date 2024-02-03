import sdk from '../client'

export async function getItemPage({ id }: { id: string }) {
  const response = await sdk.itemPage({
    id: id,
  })

  return { itemPage: response.adds }
}