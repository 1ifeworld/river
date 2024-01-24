export async function getDataForUsername({ username }: { username: string }) {
  if (!username) {
    throw new Error('username is required')
  }

  try {
    const response = await fetch(
      `http://localhost:3000/get/${username}`,
      {
        method: 'GET',
      },
    )

    if (!response.ok) {
      // console.error('Network response was not ok')
      return
    }

    const data = await response.json()

    console.log('data: ', data)

    if (data) {
      console.log('Username returned successfully')
      return data
    } else {
      console.error('Error:', data.error)
    }
  } catch (error) {
    console.error('Failed to parse JSON:', error)
  }
}
