import type { NextRequest } from 'next/server'
import {
  syndicateClientPost,
  generatePostBatchTxnInput,
  projectIdPost,
} from '@/config/syndicateClient'
import { waitForHash } from '@syndicateio/syndicate-node/utils'

export async function POST(req: NextRequest) {
  const postsArray = await req.json()

  const postTx =
    // biome-ignore lint:
    await syndicateClientPost!.transact.sendTransaction(
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
}
