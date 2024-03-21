import { novaPubClient } from '@/config/publicClient'
import { Defender } from '@openzeppelin/defender-sdk'
import { ethers } from 'ethers'
import type { NextRequest } from 'next/server'
import { addresses, postGatewayABI } from 'scrypt'
import type { Hex } from 'viem'

export async function POST(req: NextRequest) {
  const postsArray = await req.json()
  console.log({ postsArray })

  const credentials = {
    relayerApiKey: process.env.NONCE_API_UNO,
    relayerApiSecret: process.env.NONCE_SECRET_UNO,
  }

  try {
    const defenderClient = new Defender(credentials)
    const provider = defenderClient.relaySigner.getProvider()
    const signer = defenderClient.relaySigner.getSigner(provider, {
      speed: 'fast',
    })

    const postGateway = new ethers.Contract(
      process.env.NEXT_PUBLIC_POSTGATEWAY as Hex,
      postGatewayABI,
      signer as unknown as ethers.Signer,
    )

    const tx = await postGateway.postBatch(postsArray)
    await novaPubClient.waitForTransactionReceipt({
      hash: tx.hash as Hex,
    })

    return new Response(JSON.stringify({ success: true, hash: tx.hash }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
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
