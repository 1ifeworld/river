export async function getUsername({ id }: { id: bigint }) {
  if (!id) {
    throw new Error('Error: id is required')
  }

  try {
    const idString = id.toString()

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_USERNAME_SERVICE}/getUsernameById`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: idString }),
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
    console.error('Failed to fetch username:', error)
  }
}
