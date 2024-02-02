'use server'

import { revalidatePath } from 'next/cache'
import { addresses, postGateway2ABI } from 'scrypt'
import { Hash, Hex } from 'viem'
import { writeContract, getTxnInclusion } from '@/lib'
import { relayWalletClient, globalNonceManager } from '@/config/relayConfig'

interface RelayPostProps {
  signer: Hex
  msgRid: bigint
  msgTimestamp: bigint
  msgType: number
  msgBody: Hash
  hashType: number
  hash: Hash
  sigType: number
  sig: Hash
  pathsToRevalidate: string[]
}

export async function newRelayPost({
  signer,
  msgRid,
  msgTimestamp,
  msgType,
  msgBody,
  hashType,
  hash,
  sigType,
  sig,
  pathsToRevalidate
}: RelayPostProps) {
  // Attempt to send the transaction via writeContract
  try {
    const postTxn = await writeContract(relayWalletClient, globalNonceManager, {
      chain: relayWalletClient.chain ?? null,
      // address: addresses.postGateway.river_j5bpjduqfv,
      address: "0x05aD6cA9C2b3F71a6B30A8C7d414C95E10EC0217", // arb nova
      abi: postGateway2ABI,
      functionName: 'post',
      args: [{
        signer: signer,
        message: {
            rid: msgRid,
            timestamp: msgTimestamp,
            msgType: msgType,
            msgBody: msgBody
        },
        hashType: hashType,
        hash: hash,
        sigType: sigType,
        sig: sig
      }]
    })
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
