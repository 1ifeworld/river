export async function getUsername({ id }: { id: bigint }) {
  if (!id) {
    throw new Error('Error: id is required')
  }

  try {
    const response = await fetch(
      `https://w3s-service-w3s-service-pr-11.up.railway.app/names/getUsernamesById/${id}`,
      {
        method: 'GET',
      },
    )

    if (!response.ok) {
      return
    }

    const data = await response.json()

    if (data) {
      const username = data.username.replace('.sbvrsv.eth', '')
      return username
    } else {
      console.error('Error:', data.error)
    }
  } catch (error) {
    console.error('Failed to parse JSON:', error)
  }
}
