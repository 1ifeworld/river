export async function getUserDataByOwner({ owner }: { owner: string }) {
  if (!owner) {
    throw new Error('owner is required')
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_USERNAME_SERVICE}/getDataByOwner`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ owner }),
      },
    )

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Fetch error:', error)
  }
}
