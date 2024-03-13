import { optimismPubClient } from '@/config/publicClient'
import { Defender } from '@openzeppelin/defender-sdk'
import { ethers } from 'ethers'
import type { NextRequest } from 'next/server'
import { addresses, idRegistryABI } from 'scrypt'
import { type Hex, decodeAbiParameters } from 'viem'
import { SyndicateClient } from '@syndicateio/syndicate-node'

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

  const syndicate = new SyndicateClient({
    token: () => {
      const apiKey = process.env.SYNDICATE_API_KEY
      if (typeof apiKey === "undefined") {
        throw new Error("SYNDICATE_API_KEY is not defined in environment variables.")
      }
      return apiKey;
    },
  });

  try {
    // const defenderClient = new Defender(credentials)
    // const provider = defenderClient.relaySigner.getProvider()
    // const signer = defenderClient.relaySigner.getSigner(provider, {
    //   speed: 'fast',
    // })

    const idRegistry = new ethers.Contract(
      addresses.idRegistry.optimism,
      idRegistryABI,    )

    const registerTxn = await idRegistry.registerFor(
      to,
      recovery,
      deadline,
      sig,
    )

        const projectId = process.env.SYNDICATE_PROJECT_ID
        if (!projectId) {
          throw new Error("SYNDICATE_PROJECT_ID is not defined in environment variables.")
        }

    const txnResponse = await syndicate.transact.sendTransaction({
      projectId: projectId,
      contractAddress: addresses.idRegistry.optimism,
      chainId: 420, 
      functionSignature: registerTxn.data, 
    });

    const txnReceipt = await optimismPubClient.waitForTransactionReceipt({
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
        hash: txnResponse.transactionId || 'N/A', 
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
