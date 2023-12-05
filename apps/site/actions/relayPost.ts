'use server'

import { addresses, postGatewayABI } from 'scrypt'
import { nonceManager } from '@/config/ethersClient'
import { Hash, encodeFunctionData } from 'viem'
import { revalidatePath } from 'next/cache'
import { getTxnWithHash } from '@/gql'

interface RelayPostProps {
  postInput: Hash
  pathToRevalidate: string
}

export async function relayPost({
  postInput,
  pathToRevalidate,
}: RelayPostProps) {
  const encodePostCall = encodeFunctionData({
    abi: postGatewayABI,
    functionName: 'post',
    args: [postInput],
  })

  try {
    const postTxn = await nonceManager.sendTransaction({
      to: addresses.postGateway.opGoerli,
      data: encodePostCall,
    })
    
    const resp = await getTxnInclusion(postTxn.hash as Hash)
    if (resp) {
      console.log(`txn ${postTxn.hash } was processed by ponder`)
      revalidatePath(pathToRevalidate)
    } else {
      console.log(`txn ${postTxn.hash} NOT found by ponder`)
    }
  } catch (error) {
    console.error('Post transaction failed: ', error)
  }
}

async function getTxnInclusion(txnHash: Hash) {
  let txn;
  let attemptCount = 0; // Initialize counter

  while (!txn && attemptCount < 10) { // Check counter in loop condition
    try {
      const response = await getTxnWithHash({ hash: txnHash });
      if (response && response.txn) {
        txn = response.txn;
        break; // Exit the loop once a valid txn is found
      }
    } catch (error) {
      console.error(`Error fetching txn hash: ${txnHash}`, error);
    }

    attemptCount++; // Increment the counter after each attempt
    console.log(`Attempt count for txn hash :${txnHash}`, attemptCount); // Log the attempt count

    // Add a delay only if another attempt will follow
    if (!txn && attemptCount < 10) {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Waits for 1 second
    }
  }

  return txn; // Will return null if the txn isn't found within 10 attempts
}