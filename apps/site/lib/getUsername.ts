export async function getUsername({ id }: { id: bigint }) {
  if (!id) {
    throw new Error('id is required')
  }

  try {
    const response = await fetch(
      `https://server.talktomenice.workers.dev/username/${id}`,
      {
        method: 'GET',
      },
    )

    if (!response.ok) {
      // console.error('Network response was not ok')
      return
    }

    const data = await response.json()

    if (data.success) {
      // console.log('Username returned successfully')
      return data.username
    } else {
      console.error('Error:', data.error)
    }
  } catch (error) {
    console.error('Failed to parse JSON:', error)
  }
}
