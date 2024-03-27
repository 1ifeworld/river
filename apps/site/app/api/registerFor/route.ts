import { optimismPubClient } from '@/config/publicClient'
import { Defender } from '@openzeppelin/defender-sdk'
import { ethers } from 'ethers'
import type { NextRequest } from 'next/server'
import { addresses, idRegistryABI } from 'scrypt'
import { type Hex, decodeAbiParameters } from 'viem'
import { syndicate } from '@/config/syndicateClient'
import type { SyndicateApiResponse } from 'lib/api'

export async function POST(req: NextRequest) {
  const user = await req.json()
  console.log({ user })

  const { username, ...userWithoutUsername } = user
  const { to, recovery, deadline, sig } = userWithoutUsername

  console.log({ userWithoutUsername })

  // const credentials = {
  //   relayerApiKey: process.env.IDREGISTRY_API_UNO,
  //   relayerApiSecret: process.env.IDREGISTRY_SECRET_UNO,
  // }

  try {
    // const defenderClient = new Defender(credentials)
    // const provider = defenderClient.relaySigner.getProvider()
    // const signer = defenderClient.relaySigner.getSigner(provider, {
    //   speed: 'fast',
    // })

    const idRegistry = new ethers.Contract(
      addresses.idRegistry.optimism,
      idRegistryABI,
    )

    // const registerTxn = await idRegistry.registerFor(
    //   to,
    //   recovery,
    //   deadline,
    //   sig,
    // )

    const projectId = process.env.SYNDICATE_PROJECT_ID_IDREGISTRY
    if (!projectId) {
      throw new Error(
        'SYNDICATE_PROJECT_ID is not defined in environment variables.',
      )
    }

    const registerTx = await syndicate.transact.sendTransaction({
      projectId: projectId,
      contractAddress: addresses.idRegistry.optimism,
      chainId: 420,
      functionSignature:
        'registerFor(address to, address recovery, uint256 deadline, bytes sig)',
      args: { userWithoutUsername },
    })

    // const txnReceipt = await optimismPubClient.waitForTransactionReceipt({
    //   hash: registerTxn.hash as Hex,
    // })

    // const [rid, recoveryAddress] = decodeAbiParameters(
    //   [
    //     { name: 'rid', type: 'uint256' },
    //     { name: 'recoveryAddress', type: 'address' },
    //   ],
    //   txnReceipt.logs[0].data,
    // )

    // console.log('rid: ', rid)
    console.log('transaction receipt: ', registerTx)

    const options = {
      method: 'GET',
      headers: { Authorization: `Bearer ${process.env.SYNDICATE_API_KEY}` },
    }
    const txResponse: SyndicateApiResponse = await fetch(
      `https://api.syndicate.io/wallet/project/${projectId}/request/${registerTx.transactionId}`,
      options,
    ).then((response) => response.json())

    if (!txResponse || !txResponse.transactionAttempts.length) {
      throw new Error('Transaction attempt data not found.')
    }
    let successfulTxHash = null
    for (const tx of txResponse.transactionAttempts) {
      if (tx.status === 'CONFIRMED' && !tx.reverted) {
        successfulTxHash = tx.hash
        break
      }
    }

    if (!successfulTxHash) {
      throw new Error('No successful transaction attempt found.')
    }

    return new Response(
      JSON.stringify({ success: true, hash: successfulTxHash }),
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
