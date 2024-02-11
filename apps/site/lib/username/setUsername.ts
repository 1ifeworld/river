import { Hex } from 'viem'

interface RegistrationParameters {
  id: string
  to?: string
  owner: string
  name: string
  signature: string
  timestamp: string
}

export async function setUsername({
  userIdRegistered,
  username,
  registerForRecipient,
  signature,
  timestamp,
  to,
}: {
  userIdRegistered: string
  username: string
  registerForRecipient: Hex
  signature: Hex
  timestamp: string
  to?: string
}) {
  const requestBody: RegistrationParameters = {
    id: userIdRegistered,
    to: to || undefined,
    owner: registerForRecipient,
    name: username,
    signature,
    timestamp,
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_USERNAME_SERVICE}/set`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      },
    )

    const data = await response.json()

    if (data.success) {
      return { success: true }
    } else {
      throw new Error(
        data.error || 'An error occurred while setting the username.',
      )
    }
  } catch (error) {
    console.error('Fetch error:', error)
    if (error instanceof Error) {
      return { success: false, error: error.message }
    } else {
      return { success: false, error: 'An unknown error occurred.' }
    }
  }
}
