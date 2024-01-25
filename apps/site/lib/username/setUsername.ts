import { Hex } from 'viem'

interface RegistrationParameters {
  id: string
  name: string
  owner: string
}

interface AssembledReqBody {
  registrationParameters: RegistrationParameters
  signature: string
}

export async function prepareAndSetUsername({
  userIdRegistered,
  username,
  registerForRecipient,
  signature, // Expect signature as a parameter
}: {
  userIdRegistered: string
  username: string
  registerForRecipient: Hex
  signature: Hex
}) {
  // Prepare the registration parameters
  const registrationParameters = {
    id: userIdRegistered,
    name: username,
    owner: registerForRecipient,
  }

  // Assemble the request body with the provided signature
  const assembledReqBody = {
    registrationParameters,
    signature,
  }

  // Call setUsername with the assembled data
  console.log('ASSEMBLED REQ BODY', assembledReqBody)
  await setUsername(assembledReqBody)
}
export async function setUsername({
  registrationParameters,
  signature,
}: AssembledReqBody) {
  const requestBody = {
    registrationParameters,
    signature,
  }

  await fetch('http://localhost:3000/set', {
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
