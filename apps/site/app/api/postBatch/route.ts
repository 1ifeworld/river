import type { NextRequest } from 'next/server'
import { addresses } from 'scrypt'
import { syndicate, postBatchObject, projectId } from '@/config/syndicateClient'
import { waitUntilTx, authToken } from '@/lib'

export async function POST(req: NextRequest) {
  const postsArray = await req.json()

  try {
    if (!projectId || typeof projectId !== 'string') {
      throw new Error('projectId must be defined and of type string')
    }

    if (!authToken || typeof authToken !== 'string') {
      throw new Error('authToken must be defined and of type string')
    }

    const postBatchTxRequest = postBatchObject(postsArray)

    const postBatchTx =
      await syndicate.transact.sendTransaction(postBatchTxRequest)

    const successfulTxHash = await waitUntilTx({
      projectID: projectId,
      txID: postBatchTx.transactionId,
      authToken,
    })

    return new Response(
      JSON.stringify({ success: true, hash: successfulTxHash }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    let errorMessage = 'Unknown error'
    let statusCode = 500

    if (error instanceof Error) {
      errorMessage = error.message
      statusCode =
        // biome-ignore lint: `status` is not part of the standard Error interface
        typeof (error as any).status === 'number' ? (error as any).status : 500
    }

    return new Response(
      JSON.stringify({ success: false, hash: null, error: errorMessage }),
      {
        status: statusCode,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}
