import type { NextRequest } from 'next/server'
import { decodeAbiParameters } from 'viem'
import {
  syndicateClientIdRegistry,
  generateIdRegistryInput,
  projectIdRegistry,
} from '@/config/syndicateClient'
import { waitForHash } from '@syndicateio/syndicate-node/utils'
import { optimismPubClient } from '@/config/publicClient'
import type { Hex } from 'viem'

export async function POST(req: NextRequest) {
  const user = await req.json()
  const { username, ...userWithoutUsername } = user
  const { to, recovery, deadline, sig } = userWithoutUsername

  const registerTx =
    // biome-ignore lint:
    await syndicateClientIdRegistry!.transact.sendTransaction(
      generateIdRegistryInput({ to, recovery, deadline, sig }),
    )

  const successfulTxHash = await waitForHash(syndicateClientIdRegistry, {
    projectId: projectIdRegistry,
    transactionId: registerTx.transactionId,
  })

  const txnReceipt = await optimismPubClient.waitForTransactionReceipt({
    hash: successfulTxHash as Hex,
  })

  const [rid] = decodeAbiParameters(
    [
      { name: 'rid', type: 'uint256' },
      { name: 'recoveryAddress', type: 'address' },
    ],

    txnReceipt.logs[0].data,
  )

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
}
