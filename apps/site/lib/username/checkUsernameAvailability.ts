export interface CheckResponse {
  exists: boolean
}

// checks if username is available
export async function checkUsernameAvailability(
  username: string,
): Promise<CheckResponse> {
  try {
    const response = await fetch('http://localhost:3000/get', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: `${username}` }),
    })

    if (response.status === 200) {
      return { exists: true }
    } else if (response.status === 404) {
      return { exists: false }
    }
    throw new Error('Unexpected response from the server')
  } catch (error) {
    console.error('Error checking username:', error)
    throw error
  }
}

// passes owner get back boolean if it has an id
export async function checkOwnerHasId(owner: string): Promise<CheckResponse> {
  try {
    const response = await fetch('http://localhost:3000/getIdByOwner', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ owner }),
    })

    if (response.status === 200) {
      return { exists: true }
    } else if (response.status === 404) {
      return { exists: false }
    }
    throw new Error('Unexpected response from the server')
  } catch (error) {
    console.error('Error checking for owner:', error)
    throw error
  }
}
