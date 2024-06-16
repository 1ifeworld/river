import { optimismPubClient } from '@/config/publicClient'
import type { NextRequest } from 'next/server'
import { type Hex, decodeAbiParameters } from 'viem'
import {
  syndicateClient,
  generateIdRegistryInput,
  projectId
} from '@/config/syndicateClient'
import { waitUntilTx, authToken } from '@/lib'


export const maxDuration = 30 // This function can run for a maximum of 30 seconds

export async function POST(req: NextRequest) {
  const user = await req.json()
  console.log({ user })

  const { username, ...userWithoutUsername } = user
  const { to, recovery, deadline, sig } = userWithoutUsername

  console.log({ userWithoutUsername })

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
    const registerTx =
      await syndicateClient.officialActions.transact.sendTransaction(
        generateIdRegistryInput({ to, recovery, deadline, sig }),
      )

      const successfulTxHash = await waitUntilTx({
        projectID: projectId as string,
        txID: registerTx.transactionId,
        authToken: authToken as string,
      })


    const [rid] = decodeAbiParameters(
      [
        { name: 'rid', type: 'uint256' },
        { name: 'recoveryAddress', type: 'address' },
      ],
      successfulTxHash.logs[0].data,
    )

    console.log('rid: ', rid)
    console.log('transaction receipt: ', successfulTxHash)

    return new Response(
      JSON.stringify({
        success: true,
        hash: successfulTxHash,
        rid: rid.toString(),
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    console.error(error)
    let errorMessage = 'Unknown error'
    let statusCode = 500

    if (error instanceof Error) {
      errorMessage = error.message
      statusCode =
        // biome-ignore lint: `status` is not part of the standard Error interface
        typeof (error as any).status === 'number' ? (error as any).status : 500
    }

    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      {
        status: statusCode,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}