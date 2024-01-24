import { Hex } from "viem"
import { useUserContext } from "context/UserContext"

interface RegistrationParameters {
  id: string
  name: string
  owner: string
}

interface AssembledReqBody { 
  registrationParameters: RegistrationParameters
  signature: string
  walletAddress: string
}

export async function prepareAndSetUsername({
  userIdRegistered,
  username,
  registerForRecipient,
}: {
  userIdRegistered: string,
  username: string,
  registerForRecipient: Hex,
}) {
  const { signMessage, embeddedWallet } = useUserContext()

  // Check if required functions and data are available
  if (!signMessage || !embeddedWallet) {
    console.error("Missing user context data")
    return
  }

  // Prepare the registration parameters
  const registrationParameters = {
    id: userIdRegistered,
    name: username,
    owner: registerForRecipient,
  }

  // Sign the message
  const messageToSign = JSON.stringify(registrationParameters)
  const signature = await signMessage(messageToSign)

  // Assemble the request body
  const assembledReqBody: AssembledReqBody = {
    registrationParameters,
    signature,
    walletAddress: embeddedWallet.address,
  }

  // Call setUsername with the assembled data
  await setUsername(assembledReqBody)
}

export async function setUsername({
  registrationParameters,
  signature,
  walletAddress,
}: AssembledReqBody) {
  const requestBody = {
    registrationParameters,
    signature,
    walletAddress,
  }

  await fetch('https://server.talktomenice.workers.dev/set', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      if (data.success) {
        console.log('Name set successfully')
      } else {
        console.error('Error:', data.error)
      }
    })
    .catch((error) => {
      console.error('Fetch error:', error)
    })
}