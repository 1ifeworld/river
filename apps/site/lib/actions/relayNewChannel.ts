'use server'

import { revalidatePath } from 'next/cache'
import { addresses } from 'scrypt'
import { Hash, Hex, Abi } from 'viem'
import { writeContract, getTxnInclusion } from '@/lib'
import { relayWalletClient } from '@/config/viemWalletClient'
import { river_dev_2_d5hb5orqim } from '@/config/customChainConfig'
import { channelRegistryABI } from 'scrypt'

interface RelayNewChannelProps {
    signer: Hex
    userId: bigint
    channelData: Hash
    logicData: Hash
    deadline: bigint
    signature: Hash
    pathsToRevalidate: string[]
}

export async function relayNewChannel({
    signer,
    userId,
    channelData,
    logicData,
    deadline,
    signature,
  pathsToRevalidate,
}: RelayNewChannelProps) {
  try {
    // Attempt to send the transaction via writeContract
    const txn = await writeContract(relayWalletClient, {
        chain: river_dev_2_d5hb5orqim ?? null,
        address: addresses.channelRegistry.river_j5bpjduqfv,
        abi: channelRegistryABI,
        functionName: "newChannelFor",
        args: [
            signer,
            userId,
            channelData,
            addresses.roleBasedAccess.river_j5bpjduqfv,
            logicData,
            deadline,
            signature
        ]
    })
    // If writeContract is successful, postTxn is valid and we proceed to check its inclusion
    const txnInclusion = await getTxnInclusion(txn)
    // Check if the transaction is successfully included
    if (txnInclusion) {
      // If txnInclusion is true, the transaction was found and processed
      console.log(`Transaction ${txn} was processed by ponder`)
      // Revalidate paths as necessary. This is typically for cache invalidation.
      pathsToRevalidate.forEach((path) => revalidatePath(path))
      return true // Return true to indicate successful processing
    } else {
      // If txnInclusion is false, the transaction was not found or not processed
      console.log(`Transaction ${txn} NOT found by ponder`)
      return false // Return false to indicate the transaction was not processed
    }
  } catch (error) {
    // Catch and log any errors that occur during the transaction or inclusion check
    console.error('Error in realyTxn: ', error)
    return false // Return false to indicate failure due to an error
  }
}
