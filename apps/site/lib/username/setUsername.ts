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

  await fetch(`${process.env.NEXT_PUBLIC_USERNAME_DB_LOCAL}/set`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  })
  .then((response) => response.json())
  .then((data) => {
    if (!data.success) {
      console.error('Error:', data.error)
    }
  })
  .catch((error) => {
    console.error('Fetch error:', error)
  })
}
