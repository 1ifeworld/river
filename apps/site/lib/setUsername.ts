interface RegistrationParameters {
  id: string
  name: string
  owner: string
}

export async function setUsername({
  registrationParameters,
}: { registrationParameters: RegistrationParameters }) {
  await fetch('https://server.talktomenice.workers.dev/set', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registrationParameters),
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
