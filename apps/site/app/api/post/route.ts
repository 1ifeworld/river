import {
  syndicateClient,
  generatePostTxnInput,
  projectId,
} from '@/config/syndicateClient'
import { ethers } from 'ethers'
import type { NextRequest } from 'next/server'
import { addresses, postGatewayABI } from 'scrypt'
import type { Hex } from 'viem'
import { waitUntilTx, authToken } from '@/lib'

export const maxDuration = 30 // This function can run for a maximum of 30 seconds

export async function POST(req: NextRequest) {
  const post = await req.json()

  if (!syndicateClient) {
    return new Response(
      JSON.stringify({
        success: false,
        hash: null,
        error: 'Syndicate client not initialized',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
  try {
    const postTx =
      await syndicateClient.officialActions.transact.sendTransaction(
        generatePostTxnInput(post),
      )

    const successfulTxHash = await waitUntilTx({
      projectID: projectId as string,
      txID: postTx.transactionId,
      authToken: authToken as string,
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
