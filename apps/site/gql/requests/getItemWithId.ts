import sdk from '../client'

export async function getItemWithId({ id }: { id: string }) {
  const response = await sdk.itemWithId({
    id: id,
  })

  return { item: response.item }
}