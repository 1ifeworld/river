import type { NextRequest } from 'next/server'
import {
  syndicateClientPost,
  generatePostBatchTxnInput,
  projectIdPost,
} from '@/config/syndicateClient'
import { waitForHash } from '@syndicateio/syndicate-node/utils'

export async function POST(req: NextRequest) {
  const postsArray = await req.json()

  try {
    const postTx =
        // biome-ignore lint:
      await syndicateClientPost!.officialActions.transact.sendTransaction(
        generatePostBatchTxnInput(postsArray),
      )

    const successfulTxHash = await waitForHash(syndicateClientPost, {
      projectId: projectIdPost,
      transactionId: postTx.transactionId,
    })

    console.log({ successfulTxHash })

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
