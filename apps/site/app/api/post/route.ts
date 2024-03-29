import type { NextRequest } from 'next/server'
import { syndicate, postObject, projectId } from '@/config/syndicateClient'
import { waitUntilTx } from '@/lib'

export async function POST(req: NextRequest) {
  const post = await req.json()

  try {
    if (!projectId) {
      throw new Error(
        'SYNDICATE_PROJECT_ID_POSTGATEWAY is not defined in environment variables.',
      )
    }

    const postTxRequest = postObject(post)

    const postTx =
      await syndicate.transact.sendTransaction(postTxRequest)

    const successfulTxHash = await waitUntilTx({
      projectID: projectId,
      txID: post.transactionId,
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
