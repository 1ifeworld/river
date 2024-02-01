export interface CheckResponse {
  exists: boolean
}

export async function checkUsernameAvailability(
  username: string,
): Promise<CheckResponse> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_USERNAME_SERVICE}/get`, {
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

export async function checkOwnerHasId(owner: string): Promise<CheckResponse> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_USERNAME_DB}/getIdByOwner`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ owner }),
      },
    )

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
