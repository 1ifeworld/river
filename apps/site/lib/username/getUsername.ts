export async function getUsername({ id }: { id: bigint }) {
  if (!id) {
    throw new Error('Error: id is required')
  }

  try {
    // Convert BigInt to string
    const idString = id.toString()

    const response = await fetch('https://username-service-production.up.railway.app/getUsernameById', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: idString }),
    })

    if (!response.ok) {
      return
    }

    const data = await response.json()

    if (data) {
      const username = data.username
      return username
    } else {
      console.error('Error:', data.error)
    }
  } catch (error) {
    console.error('Failed to fetch username:', error)
  }
}
