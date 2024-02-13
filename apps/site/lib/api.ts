type Message = {
  rid: bigint
  timestamp: bigint
  msgType: number
  msgBody: string
}

type Post = {
  signer: string
  message: Message
  hashType: number
  hash: string
  sigType: number
  sig: string
}

type User = {
  to: string
  recovery: string
  deadline: number | string | bigint
  sig: string
}

/* API ROUTES */

// This is in to help with serialization of bigints during json stringify
// @ts-ignore
BigInt.prototype.toJSON = function () {
  return this.toString()
}

export async function relayPost(post: Post) {
  const res = await fetch('/api/post', {
    method: 'POST',
    body: JSON.stringify(post),
  })
  if (!res.ok) {
    console.error('Could not relay post txn', await res.text())
    throw new Error('Could not relay post txn')
  }
  return res.json()
}

export async function relayPostBatch(postArray: Post[]) {
  const res = await fetch('/api/postBatch', {
    method: 'POST',
    body: JSON.stringify(postArray),
  })
  if (!res.ok) {
    console.error('Could not relay post batch txn', await res.text())
    throw new Error('Could not relay post batch txn')
  }
  return res.json()
}

export async function relayRegisterFor(
  user: User,
): Promise<{ success: boolean; hash?: string; rid?: string; error?: string }> {
  try {
    const response = await fetch('/api/registerFor', {
      method: 'POST',
      body: JSON.stringify(user),
    })
    if (!response.ok) throw new Error('Transaction failed')

    const data = await response.json()
    if (data.success) {
      return { success: true, hash: data.hash, rid: data.rid }
    } else {
      throw new Error(data.error || 'Transaction not included')
    }
  } catch (error) {
    console.error('relayRegisterFor error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/* MEDIA SERVICE */

export async function w3sUpload(body: FormData, authToken: string | null) {
  try {
    const res = await fetch('https://river-media-service.up.railway.app/w3s', {
      method: 'POST',
      headers: authToken ? { Authorization: `Bearer ${authToken}` } : undefined,
      body,
    })

    if (res.status === 413) {
      console.error('File too large')
      throw new Error('File too large. Please try a smaller file.')
    } else if (!res.ok) {
      const errorText = await res.text()
      console.error('Could not upload file', errorText)
      throw new Error(`Could not upload file: ${res.status} ${res.statusText} - ${errorText}`)
    }

    return res.json()
  } catch (error) {
    console.error('Upload to Mux failed:', error)
    throw error
  }
}

export async function uploadToMux(body: string, authToken: string | null) {
  const res = await fetch(
    'https://river-media-service.up.railway.app/mux/upload',
    {
      method: 'POST',
      headers: authToken ? { Authorization: `Bearer ${authToken}` } : undefined,
      body,
    },
  )
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
