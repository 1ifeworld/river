import sdk from '../client'

export const getAllItems = async () => {
  const response = await sdk.allItems()

  return {
    items: response.items,
  }
}
