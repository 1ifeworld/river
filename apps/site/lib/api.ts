export async function w3sUpload(body: FormData, authToken: string | null) {
  const res = await fetch('https://w3s.up.railway.app/w3s', {
    method: 'POST',
    headers: authToken ? { Authorization: `Bearer ${authToken}` } : undefined,
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

export async function uploadToMux(body: string, authToken: string | null) {
  const res = await fetch('https://w3s.up.railway.app/mux', {
    method: 'POST',
    headers: authToken ? { Authorization: `Bearer ${authToken}` } : undefined,
    body,
  })
  if (!res.ok) {
    console.error('Could not process video', await res.text())
    throw new Error('Could not process video')
  }
  const muxResponseData = await res.json()

  return {
    id: muxResponseData.id,
    playbackId: muxResponseData.playbackId,
  }
}
