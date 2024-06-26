'use client'
import { getAccessToken } from '@privy-io/react-auth'

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

export interface TransactionAttempt {
  block: number
  blockCreatedAt: string
  chainId: number
  createdAt: string
  hash: string
  nonce: number
  reverted: boolean
  signedTxn: string
  status: string
  transactionId: string
  updatedAt: string
  walletAddress: string
}

export interface SyndicateApiResponse {
  chainId: number
  contractAddress: string
  createdAt: string
  data: string
  decodedData: object
  functionSignature: string
  invalid: boolean
  projectId: string
  transactionAttempts: TransactionAttempt[]
  transactionId: string
  updatedAt: string
  value: string
}

export interface WaitUntilTxOptions {
  projectID: string
  txID: string
  authToken: string
  maxAttempts?: number
  every?: number
}

export const authToken = process.env.SYNDICATE_API_KEY

export const getTransactionRequest = async ({
  projectID,
  txID,
  authToken,
}: Pick<WaitUntilTxOptions, 'projectID' | 'txID'> & { authToken: string }) => {
  const response = await fetch(
    `https://api.syndicate.io/wallet/project/${projectID}/request/${txID}`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${authToken}` },
    },
  )
  if (!response.ok) {
    throw new Error(`Failed to get transaction request: ${response.statusText}`)
  }
  return response.json()
}

export async function waitUntilTx({
  projectID,
  txID,
  authToken,
  maxAttempts = 20,
  every = 1000,
}: WaitUntilTxOptions) {
  let currAttempts = 0
  let transactionHash = null

  while (!transactionHash && currAttempts < maxAttempts) {
    const txAttempts = (
      await getTransactionRequest({ projectID, txID, authToken })
    )?.transactionAttempts

    console.log({ txAttempts })

    if (txAttempts && txAttempts.length > 0) {
      const lastAttempt = txAttempts[txAttempts.length - 1]
      if (lastAttempt.status === 'PENDING' && !lastAttempt.reverted) {
        transactionHash = lastAttempt.hash
        break
      }
    }

    currAttempts++
    if (!transactionHash && currAttempts < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, every))
    }
  }

  if (!transactionHash) {
    throw new Error('Transaction not found within maximum attempts')
  }

  return transactionHash
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

export async function w3sUpload(body: FormData) {
  const authToken = await getAccessToken()
  try {
    const res = await fetch('https://river-media-service.up.railway.app/w3s', {
      method: 'POST',
      headers: authToken ? { Authorization: `Bearer ${authToken}` } : undefined,
      body,
    })

    if (res.status === 413) {
      console.error('File too large')
      throw new Error('File too large. Please try a smaller file.')
    }

    if (!res.ok) {
      const errorText = await res.text()
      console.error('Could not upload file', errorText)
      throw new Error(
        `Could not upload file: ${res.status} ${res.statusText} - ${errorText}`,
      )
    }

    return res.json()
  } catch (error) {
    console.error('Upload failed', error)
    throw error
  }
}

export async function uploadToMux(body: string) {
  const authToken = await getAccessToken()
  try {
    const res = await fetch(
      'https://river-media-service.up.railway.app/mux/upload',
      {
        method: 'POST',
        headers: authToken
          ? { Authorization: `Bearer ${authToken}` }
          : undefined,
        body,
      },
    )
    if (!res.ok) {
      console.error('Could not upload to Mux', await res.text())
      throw new Error('Could not upload to Mux')
    }
    const muxResponseData = await res.json()

    return {
      id: muxResponseData.id,
      playbackId: muxResponseData.playbackId,
    }
  } catch (error) {
    console.error('Upload to Mux failed', error)
    throw error
  }
}
