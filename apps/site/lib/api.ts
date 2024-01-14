export async function w3sUpload(body: FormData) {
  const res = await fetch('/api/w3s', {
    method: 'POST',
    body,
    credentials: 'same-origin',
  })
  if (!res.ok) {
    console.error('Could not upload file', await res.text())
    throw new Error('Could not upload file')
  }
  return res.json()
}
