import sdk from '../client'

export async function getAllItems() {
  const response = await sdk.allItems()

  return {
    items: response.items
  }
}
