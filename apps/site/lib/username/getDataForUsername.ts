export async function getDataForUsername({ username }: { username: string }) {
  if (!username) {
    throw new Error('username is required')
  }

  try {
    const response = await fetch(`https://username-service-production.up.railway.app/get/${username}`, {
      method: 'GET',
    })

    if (!response.ok) {
      return
    }

    const data = await response.json()


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
