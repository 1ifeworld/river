interface RegistrationParameters {
  id: string
  name: string
  owner: string
}

export async function setUsername({
  registrationParameters,
}: { registrationParameters: RegistrationParameters }) {
  try {
    const response = await fetch(
      'https://server.talktomenice.workers.dev/set',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationParameters),
      },
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    if (data.success) {
      console.log('Name set successfully')
    } else {
      throw new Error(data.error || 'An unknown error occurred')
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Fetch error:', error.message)
      alert('Error setting username: ' + error.message)
    } else {
      console.error('Fetch error:', error)
      alert('An unexpected error occurred')
    }
  }
}
