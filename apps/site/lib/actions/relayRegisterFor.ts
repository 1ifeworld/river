'use server'

import { revalidatePath } from 'next/cache'
import { Hash, Hex } from 'viem'
import { addresses, idRegistryABI } from 'scrypt'
import { publicClient } from '@/config/publicClient'
import { relayWalletClient, globalNonceManager } from '@/config/relayConfig'
import { writeContract, getTxnInclusion } from '@/lib'
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
  try {
    // Attempt to send the transaction via writeContract
    const registerTxn = await writeContract(relayWalletClient, globalNonceManager, {
      chain: relayWalletClient.chain ?? null,
      address: addresses.idRegistry.river_j5bpjduqfv,
      abi: idRegistryABI,
      functionName: 'registerFor',
      args: [
        registerForRecipient, // to
        '0x33F59bfD58c16dEfB93612De65A5123F982F58bA', // backup
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
    // set username in username db
    await setUsername({
      registrationParameters: {
        id: String(userIdRegistered),
        name: username,
        owner: registerForRecipient,
      },
    })

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
