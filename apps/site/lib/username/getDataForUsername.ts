export async function getDataForUsername({ username }: { username: string }) {
  if (!username) {
    throw new Error('username is required')
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_USERNAME_SERVICE}/get`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()
    console.log({data})
    console.log('Username returned successfully', data)
    return data
  } catch (error) {
    console.error('Fetch error:', error)
  }
}
