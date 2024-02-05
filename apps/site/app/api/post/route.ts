import { ethers } from 'ethers'
import { postGatewayABI, addresses } from 'scrypt'
import { Defender } from '@openzeppelin/defender-sdk'
import { novaPubClient } from '@/config/publicClient'
import { NextRequest } from 'next/server'
import { type Hex } from 'viem'

export async function POST(req: NextRequest) {
  const post = await req.json()

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
      addresses.postGateway.nova,
      postGatewayABI,
      signer as unknown as ethers.Signer,
    )

    const tx = await postGateway.post(post)

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
      if (typeof (error as any).status === 'number') {
        statusCode = (error as any).status
      }
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
