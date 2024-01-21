export interface CheckResponse {
  exists: boolean
}

export async function checkUsernameAvailability(
  username: string,
): Promise<CheckResponse> {
  try {
    const response = await fetch(
      `https://server.talktomenice.workers.dev/get/${`${username}.sbvrsv.eth`}`,
    )
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

export async function checkOwnerHasId(owner: string,): 
Promise<CheckResponse>{
  try {
    const response = await fetch(
      `https://server.talktomenice.workers.dev/id/${`${owner}`}`,
    )
    if (response.status === 200) {
      return { exists: true }
    } else if(response.status === 404) {
      return { exists: false }
    }
    throw new Error('Unexpected response from the server')
  } catch (error) {
    console.error('Error checking for owner:', error)
    throw error
  }
}

