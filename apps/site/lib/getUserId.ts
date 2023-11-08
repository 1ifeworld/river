import { Hex } from 'viem'

export async function getUserId({
  smartAccountAddress,
}: { smartAccountAddress: Hex }) {
  // Set the state variable for a user's id
  const userId = await fetch(
    `https://server.talktomenice.workers.dev/id/${smartAccountAddress}`,
    {
      method: 'GET',
    },
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log('Id returned successfully')
        return data.id
      } else {
        console.error('Error:', data.error)
      }
    })
  return userId
}
