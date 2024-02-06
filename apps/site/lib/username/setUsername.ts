  import { Hex } from 'viem'

  interface RegistrationParameters {
    id: string
    to?: string
    owner: string
    name: string
    signature: string
    timestamp: string
  }

  interface SetUsernameResponse {
    success: boolean
    data?: { username: string }
    error?: string
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
  }) : Promise<SetUsernameResponse> { 
    const requestBody: RegistrationParameters = {
      id: userIdRegistered,
      to: to || undefined,
      owner: registerForRecipient,
      name: username,
      signature,
      timestamp,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_USERNAME_SERVICE}/set`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      const data = await response.json()
  
      if (response.ok && data.success) {
        return { success: true, data: { username: data.username } }
      } else {
        return { success: false, error: data.error || 'An error occurred while setting the username.' };
      }
    } catch (error) {
      console.error('Fetch error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'An unknown error occurred.' };
    }
  }
  