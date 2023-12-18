export async function getUsername({ id }: { id: bigint }) {
  if (!id) {
    throw new Error('Error: id is required')
  }

  try {
    const response = await fetch(
      `https://server.talktomenice.workers.dev/username/${id}`,
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
