import { NextRequest } from "next/server"

type Message = {
  rid: bigint,
  timestamp: bigint,
  msgType: number,
  msgBody: string, // Assuming Hash is a string type adjust as necessary
}

type Post = {
  signer: string, // Assuming Hex is a string type adjust as necessary
  message: Message,
  hashType: number,
  hash: string,
  sigType: number,
  sig: string,
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

export async function w3sUpload(body: FormData, authToken: string | null) {
  const res = await fetch('https://river-media-service.up.railway.app/w3s', {
    method: 'POST',
    headers: authToken ? { Authorization: `Bearer ${authToken}` } : undefined,
    body,
  })
  if (!res.ok) {
    console.error('Could not upload file', await res.text())
    throw new Error('Could not upload file')
  }
  return res.json()
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
