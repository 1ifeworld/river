
"use server"

import { ethers } from "ethers"
import { addresses, idRegistryABI } from "scrypt"
import { Defender } from "@openzeppelin/defender-sdk"
import { publicClient } from "@/config/publicClient"
import { decodeAbiParameters } from 'viem'
import { NextRequest } from "next/server"
import { setUsername } from "lib/username"


export async function POST(req: NextRequest) {
  const user = await req.json()
  console.log({ user })

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

    const idRegistry = new ethers.Contract(
      addresses.idRegistry.nova,
      idRegistryABI,
      signer
    )

    const registerTxn = await idRegistry.registerFor(user)
    await registerTxn.wait()

    const txnReceipt = await publicClient.waitForTransactionReceipt({
      hash: registerTxn,
    })
    const [rid, recoveryAddress] = decodeAbiParameters(
      [
        { name: 'rid', type: 'uint256' },
        { name: 'recoveryAddress', type: 'address' },
      ],
      txnReceipt.logs[0].data,
    )
    console.log('rid: ', rid)
    console.log('transaction receipt: ', txnReceipt)

    return new Response(JSON.stringify({ success: true, hash: registerTxn.hash, rid }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error(error) 
    let errorMessage = "Unknown error"
    let statusCode = 500

    if (error instanceof Error) {
      errorMessage = error.message
      statusCode = typeof (error as any).status === "number" ? (error as any).status : 500
    }

    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      {
        status: statusCode,
        headers: { "Content-Type": "application/json" },
      }
    )
  }
}
