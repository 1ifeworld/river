import { novaPubClient } from '@/config/publicClient'
import { Defender } from '@openzeppelin/defender-sdk'
import { ethers } from 'ethers'
import type { NextRequest } from 'next/server'
import { addresses, postGatewayABI } from 'scrypt'
import type { Hex } from 'viem'
import { syndicate } from '@/config/syndicateClient'
import type { SyndicateApiResponse } from 'lib/api'

export async function POST(req: NextRequest) {
  const post = await req.json()

  // const credentials = {
  //   relayerApiKey: process.env.NONCE_API_UNO,
  //   relayerApiSecret: process.env.NONCE_SECRET_UNO,
  // }

  try {
    // const defenderClient = new Defender(credentials)
    // const provider = defenderClient.relaySigner.getProvider()
    // const signer = defenderClient.relaySigner.getSigner(provider, {
    //   speed: 'fast',
    // })

    // const postGateway = new ethers.Contract(
    //   addresses.postGateway.nova,
    //   postGatewayABI,
    // )

    const postTx = await syndicate.transact.sendTransaction({
      projectId: 'a8349c10-aafd-4785-95f3-bbada9784910',
      contractAddress: '0x423a602F5e551A25b28eb33eB56B961590aD5290',
      chainId: 42070,
      functionSignature:
        'post((address signer, (uint256 rid, uint256 timestamp, uint8 msgType, bytes msgBody) message, uint16 hashType, bytes32 hash, uint16 sigType, bytes sig))',
      args: {post},
    })

    // const tx = await postGateway.post(post)

    // await novaPubClient.waitForTransactionReceipt({
    //   hash: tx.hash as Hex,
    // })

    const projectId = process.env.SYNDICATE_PROJECT_ID_POSTGATEWAY
    if (!projectId) {
      throw new Error(
        'SYNDICATE_PROJECT_ID_POSTGATEWAY is not defined in environment variables.',
      )
    }

    const options = {
      method: 'GET',
      headers: { Authorization: `Bearer ${process.env.SYNDICATE_API_KEY}`},
    }

    const txResponse: SyndicateApiResponse = await fetch(
      `https://api.syndicate.io/wallet/project/${projectId}/request/${postTx.transactionId}`,
      options,
    )
      .then((response) => response.json())
      .catch((err) => console.error(err))

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
