export async function getUsername({ id }: { id: string }) {
  if (!id) return
  try {
    // const idString = id.toString()

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_USERNAME_SERVICE}/getUsernameById`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
      },
    )

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
