import { ethers } from 'ethers'
import { addresses, idRegistryABI } from 'scrypt'
import { Defender } from '@openzeppelin/defender-sdk'
import { publicClient } from '@/config/publicClient'
import { decodeAbiParameters, Hex } from 'viem'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const user = await req.json()
  console.log({ user })

  const { username, ...userWithoutUsername } = user
  const { to, recovery, deadline, sig } = userWithoutUsername

  console.log({ userWithoutUsername })
  const credentials = {
    relayerApiKey: process.env.IDREGISTRY_API_UNO,
    relayerApiSecret: process.env.IDREGISTRY_SECRET_UNO,
  }

  try {
    const defenderClient = new Defender(credentials)
    const provider = defenderClient.relaySigner.getProvider()
    const signer = defenderClient.relaySigner.getSigner(provider, {
      speed: 'fast',
    })

    const idRegistry = new ethers.Contract(
      addresses.idRegistry.optimism,
      idRegistryABI,
      signer as unknown as ethers.Signer,
    )

    const registerTxn = await idRegistry.registerFor(
      to,
      recovery,
      deadline,
      sig,
    )

    const txnReceipt = await publicClient.waitForTransactionReceipt({
      hash: registerTxn.hash as Hex,
    })

    const [rid, recoveryAddress] = decodeAbiParameters(
      [
        { name: 'rid', type: 'uint256' },
        { name: 'recoveryAddress', type: 'address' },
      ],
      txnReceipt.logs[0].data,
    )

    console.log('rid: ', rid)
    console.log('transaction receipt: ', registerTxn)

    return new Response(
      JSON.stringify({
        success: true,
        hash: registerTxn.hash,
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
