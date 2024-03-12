import { getTxnWithHash } from '@/gql'
import type { Hash } from 'viem'

export async function getTxnInclusion(txnHash: Hash): Promise<boolean> {
  let txn
  let attemptCount = 0 // Initialize counter

  while (!txn && attemptCount < 10) {
    // Check counter in loop condition
    try {
      const response = await getTxnWithHash({ hash: txnHash })
      if (response && response.txn) {
        // return true if txn was found
        return true
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

  return false // Will return false if the txn isn't found within 10 attempts
}
