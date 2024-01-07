'use server'

import { nonceManager } from '@/config/ethersClient'
import { publicClient } from '@/config/publicClient'
import { getTxnWithHash } from '@/gql'
import { revalidatePath } from 'next/cache'
import { addresses, idRegistryABI } from 'scrypt'
import { Hash, Hex, encodeFunctionData } from 'viem'
import { setUsername } from '../username'

interface RelayRegisterForProps {
  registerForRecipient: Hex
  expiration: bigint
  signature: Hash
  username: string
  pathToRevalidate: string
}

export async function relayRegisterFor({
  registerForRecipient,
  expiration,
  signature,
  username,
  pathToRevalidate,
}: RelayRegisterForProps) {
  const encodedRegisterCall = encodeFunctionData({
    abi: idRegistryABI,
    functionName: 'registerFor',
    args: [
      registerForRecipient, // to
      '0x33F59bfD58c16dEfB93612De65A5123F982F58bA', // backup
      expiration, // expiration
      signature, // sig
    ],
  })

  try {
    const registerTxn = await nonceManager.sendTransaction({
      to: addresses.idRegistry.river_j5bpjduqfv,
      data: encodedRegisterCall,
    })

    const transaction = await publicClient.waitForTransactionReceipt({
      hash: registerTxn.hash as Hash,
    })

    const userIdRegistered = parseInt(
      transaction.logs[0].topics[2] as string,
      16,
    )

    await setUsername({
      registrationParameters: {
        id: String(userIdRegistered),
        name: username,
        owner: registerForRecipient,
      },
    })

    const resp = await getTxnInclusion(registerTxn.hash as Hash)

    if (resp) {
      console.log(`txn ${registerTxn.hash} was processed by ponder`)
      revalidatePath(pathToRevalidate)
    } else {
      console.log(`txn ${registerTxn.hash} NOT found by ponder`)
    }
  } catch (error) {
    console.error('Register transaction failed: ', error)
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
