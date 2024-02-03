'use server'

import { revalidatePath } from 'next/cache'
import { addresses, postGateway2ABI } from 'scrypt'
import { Hash, Hex } from 'viem'
import { writeContract, getTxnInclusion } from '@/lib'
import { relayWalletClient, globalNonceManager } from '@/config/relayConfig'

type Message = {
  rid: bigint
  timestamp: bigint
  msgType: number
  msgBody: Hash
}

type Post = {
  signer: Hex
  message: Message
  hashType: number
  hash: Hash
  sigType: number
  sig: Hash
}

interface RelayBatchPostProps {
  posts: Post[]
  pathsToRevalidate: string[]
}

export async function newRelayBatchPost({
  posts,
  pathsToRevalidate,
}: RelayBatchPostProps) {
  // Attempt to send the transaction via writeContract
  try {
    const postBatchTxn = await writeContract(
      relayWalletClient,
      globalNonceManager,
      {
        chain: relayWalletClient.chain ?? null,
        // address: addresses.postGateway.river_j5bpjduqfv,
        address: '0x05aD6cA9C2b3F71a6B30A8C7d414C95E10EC0217', // arb nova
        abi: postGateway2ABI,
        functionName: 'postBatch',
        args: [posts],
      },
    )
    // If writeContract is successful, postTxn is valid and we proceed to check its inclusion
    const txnInclusion = await getTxnInclusion(postBatchTxn)
    // Check if the transaction is successfully included
    if (txnInclusion) {
      // If txnInclusion is true, the transaction was found and processed
      console.log(`Transaction ${postBatchTxn} was processed by ponder`)
      // Revalidate paths as necessary. This is typically for cache invalidation.
      pathsToRevalidate.forEach((path) => revalidatePath(path))
      return true // Return true to indicate successful processing
    } else {
      // If txnInclusion is false, the transaction was not found or not processed
      console.log(`Transaction ${postBatchTxn} NOT found by ponder`)
      return false // Return false to indicate the transaction was not processed
    }
  } catch (error) {
    // Catch and log any errors that occur during the transaction or inclusion check
    console.error('Error in relayPost: ', error)
    return false // Return false to indicate failure due to an error
  }
}
