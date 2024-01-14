'use server'

import { nonceManager } from '@/config/ethersClient'
import { getTxnWithHash } from '@/gql'
import { revalidatePath } from 'next/cache'
import { addresses, postGatewayABI } from 'scrypt'
import { Hash } from 'viem'
import { writeContract } from 'lib/transactions/writeContract'
import { relayWalletClient } from '@/config/viemWalletClient'

interface RelayPostProps {
  postInput: Hash
  pathsToRevalidate: string[]
}

export async function relayPost({
  postInput,
  pathsToRevalidate,
}: RelayPostProps) {

  try {

    const postTxn = await writeContract(relayWalletClient, {
      chain: relayWalletClient.chain ?? null,
      address: addresses.postGateway.river_j5bpjduqfv,
      abi: postGatewayABI,
      functionName: "post",
      args: [postInput]
    })

    const resp = await getTxnInclusion(postTxn)
    if (resp) {
      console.log(`txn ${postTxn} was processed by ponder`)
      for (const path of pathsToRevalidate) {
        revalidatePath(path)
      }
    } else {
      console.log(`txn ${postTxn} NOT found by ponder`)
    }
  } catch (error) {
    console.error('Post transaction failed: ', error)
    nonceManager.reset()
  }
}

async function getTxnInclusion(txnHash: Hash) {
  let txn
  let attemptCount = 0 // Initialize counter

  while (!txn && attemptCount < 10) {
    // Check counter in loop condition
    try {
      const response = await getTxnWithHash({ hash: txnHash })
      if (response && response.txn) {
        txn = response.txn
        break // Exit the loop once a valid txn is found
      }
    } catch (error) {
      console.error(`Error fetching txn hash: ${txnHash}`, error)
    }

    attemptCount++ // Increment the counter after each attempt
    console.log(`Attempt count for txn hash :${txnHash}`, attemptCount) // Log the attempt count

    // Add a delay only if another attempt will follow
    if (!txn && attemptCount < 10) {
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Waits for 1 second
    }
  }

  return txn // Will return null if the txn isn't found within 10 attempts
}
