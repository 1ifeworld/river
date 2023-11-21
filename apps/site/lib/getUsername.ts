export async function getUsername({ id }: { id: string }) {
  try {
    const response = await fetch(
      `https://server.talktomenice.workers.dev/username/${id}`,
      {
        method: 'GET',
      },
    )

    if (!response.ok) {
      console.error('Network response was not ok')
      return
    }

    const data = await response.json()

    if (data.success) {
      console.log('Username returned successfully')
      return data
    } else {
      console.error('Error:', data.error)
    }
  } catch (error) {
    console.error('Failed to parse JSON:', error)
  }
}
