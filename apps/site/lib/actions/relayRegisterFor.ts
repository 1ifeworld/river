'use server'

import { revalidatePath } from 'next/cache'
import { Hash, Hex } from 'viem'
import { addresses, idRegistryABI } from 'scrypt'
import { publicClient } from '@/config/publicClient'
import { relayWalletClient } from '@/config/viemWalletClient'
import { writeContract, getTxnInclusion } from '@/lib'
import { setUsername } from '../username'

interface RelayRegisterForProps {
  registerForRecipient: Hex
  recovery: Hex
  expiration: bigint
  signature: Hash
  username: string
  pathToRevalidate: string
}

export async function relayRegisterFor({
  registerForRecipient,
  recovery,
  expiration,
  signature,
  username,
  pathToRevalidate,
}: RelayRegisterForProps) {
  try {
    // Attempt to send the transaction via writeContract
    const registerTxn = await writeContract(relayWalletClient, {
      chain: relayWalletClient.chain ?? null,
      address: addresses.idRegistry.river_dev_2_d5hb5orqim,
      abi: idRegistryABI,
      functionName: 'registerFor',
      args: [
        registerForRecipient, // to
        recovery, // recovery
        expiration, // expiration
        signature, // sig
      ],
    })
    // wait for txn receipt
    const txnReceipt = await publicClient.waitForTransactionReceipt({
      hash: registerTxn,
    })
    // extract userId from logs
    const userIdRegistered = parseInt(
      txnReceipt.logs[0].topics[2] as string,
      16,
    )
    // // set username in username db
    // await setUsername({
    //   registrationParameters: {
    //     id: String(userIdRegistered),
    //     name: username,
    //     owner: registerForRecipient,
    //   },
    // })

    // If writeContract + setUsername were successful, registerFor txn is valid and we proceed to check its inclusion
    const txnInclusion = await getTxnInclusion(registerTxn)
    // Check if the transaction is successfully included
    if (txnInclusion) {
      // If txnInclusion is true, the transaction was found and processed
      console.log(`Transaction ${registerTxn} was processed by ponder`)
      // Revalidate path. This is typically for cache invalidation.
      revalidatePath(pathToRevalidate)
      return true // Return true to indicate successful processing
    } else {
      // If txnInclusion is false, the transaction was not found or not processed
      console.log(`Transaction ${registerTxn} NOT found by ponder`)
      return false // Return false to indicate the transaction was not processed
    }
  } catch (error) {
    // Catch and log any errors that occur during the txn processing or username setting
    console.error('Error in user registration: ', error)
    return false // Return false to indicate failure due to an error
  }
}
