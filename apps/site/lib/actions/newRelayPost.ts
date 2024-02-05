// // 'use server'

// // import { revalidatePath } from 'next/cache'
// // import { addresses, postGateway2ABI } from 'scrypt'
// // import { Hash, Hex } from 'viem'
// // import { writeContract, getTxnInclusion } from '@/lib'
// // import { relayWalletClient, globalNonceManager } from '@/config/relayConfig'

// // interface RelayPostProps {
// //   signer: Hex
// //   msgRid: bigint
// //   msgTimestamp: bigint
// //   msgType: number
// //   msgBody: Hash
// //   hashType: number
// //   hash: Hash
// //   sigType: number
// //   sig: Hash
// //   pathsToRevalidate: string[]
// // }

// // export async function newRelayPost({
// //   signer,
// //   msgRid,
// //   msgTimestamp,
// //   msgType,
// //   msgBody,
// //   hashType,
// //   hash,
// //   sigType,
// //   sig,
// //   pathsToRevalidate,
// // }: RelayPostProps) {
// //   // Attempt to send the transaction via writeContract
// //   try {
// //     const postTxn = await writeContract(relayWalletClient, globalNonceManager, {
// //       chain: relayWalletClient.chain ?? null,
// //       // address: addresses.postGateway.river_j5bpjduqfv,
// //       address: addresses.postGateway.nova, // arb nova
// //       abi: postGateway2ABI,
// //       functionName: 'post',
// //       args: [
// //         {
// //           signer: signer,
// //           message: {
// //             rid: msgRid,
// //             timestamp: msgTimestamp,
// //             msgType: msgType,
// //             msgBody: msgBody,
// //           },
// //           hashType: hashType,
// //           hash: hash,
// //           sigType: sigType,
// //           sig: sig,
// //         },
// //       ],
// //     })
// //     // If writeContract is successful, postTxn is valid and we proceed to check its inclusion
// //     const txnInclusion = await getTxnInclusion(postTxn)
// //     // Check if the transaction is successfully included
// //     if (txnInclusion) {
// //       // If txnInclusion is true, the transaction was found and processed
// //       console.log(`Transaction ${postTxn} was processed by ponder`)
// //       // Revalidate paths as necessary. This is typically for cache invalidation.
// //       pathsToRevalidate.forEach((path) => revalidatePath(path))
// //       return true // Return true to indicate successful processing
// //     } else {
// //       // If txnInclusion is false, the transaction was not found or not processed
// //       console.log(`Transaction ${postTxn} NOT found by ponder`)
// //       return false // Return false to indicate the transaction was not processed
// //     }
// //   } catch (error) {
// //     // Catch and log any errors that occur during the transaction or inclusion check
// //     console.error('Error in relayPost: ', error)
// //     return false // Return false to indicate failure due to an error
// //   }
// // }

// 'use server'

// import { ethers } from 'ethers' // Import ethers for encoding data
// import { revalidatePath } from 'next/cache'
// import { addresses, postGateway2ABI } from 'scrypt'
// import { getTxnInclusion } from './getTxnInclusion'
// import { defenderClient } from 'app/api/defenderClient'
// import { Hex } from 'viem'

// interface RelayPostProps {
//   signer: string // Assuming Hex is essentially a string
//   msgRid: bigint
//   msgTimestamp: bigint
//   msgType: number
//   msgBody: string // Assuming Hash is essentially a string
//   hashType: number
//   hash: string
//   sigType: number
//   sig: string
//   pathsToRevalidate: string[]
// }

// export async function newRelayPost({
//   signer,
//   msgRid,
//   msgTimestamp,
//   msgType,
//   msgBody,
//   hashType,
//   hash,
//   sigType,
//   sig,
//   pathsToRevalidate,
// }: RelayPostProps) {
//   try {
//     // Encode the transaction data using ethers
//     const iface = new ethers.Interface(postGateway2ABI)
//     const data = iface.encodeFunctionData('post', [{
//       signer,
//       message: {
//         rid: msgRid.toString(),
//         timestamp: msgTimestamp.toString(), 
//         msgType,
//         msgBody,
//       },
//       hashType,
//       hash,
//       sigType,
//       sig,
//     }])

//     const tx = {
//       to: addresses.postGateway.nova, 
//       data: data, 
//       gasLimit: ethers.hexlify('1000000'), 
//       maxPriorityFeePerGas: ethers.parseUnits('2', 'gwei'), 
//       maxFeePerGas: ethers.parseUnits('100', 'gwei'),
//     }

//     // Send the transaction via Defender Relayer
//     const response = await defenderClient.relaySigner.sendTransaction(tx)

//     // Assuming getTxnInclusion checks the blockchain for txn status
//     const txnInclusion = await getTxnInclusion(response.hash as Hex)
//     if (txnInclusion) {
//       console.log(`Transaction ${response.hash} successfully processed.`)
//       pathsToRevalidate.forEach(path => revalidatePath(path))
//       return true
//     } else {
//       console.log(`Transaction ${response.hash} not found or not processed.`)
//       return false
//     }
//   } catch (error) {
//     console.error('Error in newRelayPost: ', error)
//     return false
//   }
// }
