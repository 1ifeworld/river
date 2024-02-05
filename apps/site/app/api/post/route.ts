
"use server"

import { ethers } from "ethers"
import { postGateway2ABI, addresses } from "scrypt"
import { Defender } from "@openzeppelin/defender-sdk"

import { NextRequest } from "next/server"

type Message = {
  rid: bigint
  timestamp: bigint
  msgType: number
  msgBody: string 
}


export async function POST(req: NextRequest) {
  const post = await req.json()
  console.log({ post })

  const credentials = {
    relayerApiKey: process.env.NONCE_API_UNO,
    relayerApiSecret: process.env.NONCE_SECRET_UNO,
  }


  try {
    const defenderClient = new Defender(credentials)
    const provider = defenderClient.relaySigner.getProvider()
    const signer = defenderClient.relaySigner.getSigner(provider, {
      speed: "fast",
    })

    const postGateway = new ethers.Contract(
      addresses.postGateway.nova,
      postGateway2ABI,
      signer as unknown as ethers.Signer 

    )

    const tx = await postGateway.post(post)
    await tx.wait()


    return new Response(JSON.stringify({ success: true, hash: tx.hash }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    let errorMessage = "Unknown error"
    let statusCode = 500

    if (error instanceof Error) {
      errorMessage = error.message
      if (typeof (error as any).status === "number") {
        statusCode = (error as any).status
      }
    }

    return new Response(
      JSON.stringify({ success: false, hash: null, error: errorMessage }),
      {
        status: statusCode,
        headers: { "Content-Type": "application/json" },
      }
    )
  }
}
