'use server'

import { revalidatePath } from 'next/cache'
import { addresses, postGatewayABI } from 'scrypt'
import { Hash } from 'viem'
import { writeContract, getTxnInclusion } from '@/lib'
import { relayWalletClient, globalNonceManager } from '@/config/relayConfig'

interface RelayPostProps {
  postInput: Hash
  pathsToRevalidate: string[]
}

export async function relayPost({
  postInput,
  pathsToRevalidate,
}: RelayPostProps) {
  // Attempt to send the transaction via writeContract
  const postTxn = await writeContract(relayWalletClient, globalNonceManager, {
    chain: relayWalletClient.chain ?? null,
    address: addresses.postGateway.river_j5bpjduqfv,
    abi: postGatewayABI,
    functionName: 'post',
    args: [postInput],
  })  
  if (!postTxn) return false
  try {
    // If writeContract is successful, postTxn is valid and we proceed to check its inclusion
    const txnInclusion = await getTxnInclusion(postTxn)
    // Check if the transaction is successfully included
    if (txnInclusion) {
      // If txnInclusion is true, the transaction was found and processed
      console.log(`Transaction ${postTxn} was processed by ponder`)
      // Revalidate paths as necessary. This is typically for cache invalidation.
      pathsToRevalidate.forEach((path) => revalidatePath(path))
      return true // Return true to indicate successful processing
    } else {
      // If txnInclusion is false, the transaction was not found or not processed
      console.log(`Transaction ${postTxn} NOT found by ponder`)
      return false // Return false to indicate the transaction was not processed
    }
  } catch (error) {
    // Catch and log any errors that occur during the transaction or inclusion check
    console.error('Error in relayPost: ', error)
    return false // Return false to indicate failure due to an error
  }
}
