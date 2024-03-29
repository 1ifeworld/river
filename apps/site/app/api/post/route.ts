import type { NextRequest } from 'next/server'
import { syndicate } from '@/config/syndicateClient'
import { addresses } from 'scrypt'
import { waitUntilTx } from '@/lib'


export async function POST(req: NextRequest) {
  const post = await req.json()
  console.log("post", post)



  /* DEFENDER CODE */

  // const credentials = {
  //   relayerApiKey: process.env.NONCE_API_UNO,
  //   relayerApiSecret: process.env.NONCE_SECRET_UNO,
  // }

  try {

  /* DEFENDER CODE */

    // const defenderClient = new Defender(credentials)
    // const provider = defenderClient.relaySigner.getProvider()
    // const signer = defenderClient.relaySigner.getSigner(provider, {
    //   speed: 'fast',
    // })

    // const postGateway = new ethers.Contract(
    //   addresses.postGateway.nova,
    //   postGatewayABI,
    // )


    const projectId = process.env.SYNDICATE_PROJECT_ID_POSTGATEWAY

    if (!projectId) {
      throw new Error(
        'SYNDICATE_PROJECT_ID_POSTGATEWAY is not defined in environment variables.',
      )
    }



    const postTx = await syndicate.transact.sendTransaction({
      projectId: projectId,
      contractAddress: addresses.postGateway.nova,
      chainId: 42170,
      functionSignature: 'post((address signer, (uint256 rid, uint256 timestamp, uint8 msgType, bytes msgBody) message, uint16 hashType, bytes32 hash, uint16 sigType, bytes sig) post)',
      args: {
        post: post
      }
    })

    console.log({postTx})

    // const tx = await postGateway.post(post)

    // await novaPubClient.waitForTransactionReceipt({
    //   hash: tx.hash as Hex,
    // })


    // Use the waitUntilTx function to wait for the transaction to be processed
     const successfulTxHash = await waitUntilTx({
      projectID: projectId,
      txID: postTx.transactionId,
    })

    console.log({successfulTxHash})

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