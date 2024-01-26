import { Hex } from "viem"

interface RegistrationParameters {
  id: string
  to?: string
  owner: string
  name: string
  signature: string
  timestamp: string

}

export async function prepareForSetUsername({
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
  // Prepare the registration parameters
  const registrationParameters = {
    id: userIdRegistered,
    ...(to && { to }),
    owner: registerForRecipient,
    name: username,
    signature,
    timestamp, 
  }

  await setUsername(registrationParameters)
}

export async function setUsername({
  id,
  to,
  owner,
  name,
  signature,
  timestamp,
}: RegistrationParameters) {
  const requestBody = {
    id,
    to,
    owner,
    name,
    signature,
    timestamp,
  }

  await fetch("http://localhost:3000/set", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
      } else {
        console.error("Error:", data.error)
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error)
    })
}
