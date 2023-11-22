import { type Hex } from 'viem'

export async function getUserId({
  smartAccountAddress,
}: { smartAccountAddress: Hex }) {
  const userId = await fetch(
    `https://server.talktomenice.workers.dev/id/${smartAccountAddress}`,
    {
      method: 'GET',
    },
  )
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      if (data && data.id) {
        console.log('Id returned successfully')
        console.log('user Id: ', data.id)
        return data.id
      } else {
        console.error('Error:', data.error)
        return null
      }
    })

  console.log('user Id: ', userId)
  return userId
}
