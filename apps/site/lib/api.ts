export async function w3sUpload(body: FormData) {
  const res = await fetch('https://w3s.up.railway.app/w3s', {
    method: 'POST',
    body,
    // TODO: Add credentials check
    //   credentials: 'same-origin',
  })
  if (!res.ok) {
    console.error('Could not upload file', await res.text())
    throw new Error('Could not upload file')
  }
  return res.json()
}
