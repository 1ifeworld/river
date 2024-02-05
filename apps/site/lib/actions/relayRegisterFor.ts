// 'use server'

// import { revalidatePath } from 'next/cache'
// import { Hash, Hex, decodeAbiParameters } from 'viem'
// import { addresses, idRegistryABI } from 'scrypt'
// import { publicClient } from '@/config/publicClient'
// import { relayWalletClient, globalNonceManager } from '@/config/relayConfig'
// import { defenderClient } from 'app/api/defenderClient'
// import { writeContract, getTxnInclusion } from '@/lib'
// import { setUsername } from '@/lib'
// import { ethers } from 'ethers'

// interface RelayRegisterForProps {
//   registerForRecipient: Hex
//   recovery: Hex
//   expiration: bigint
//   signature: Hash
//   username: string
//   pathToRevalidate: string
// }

// export async function relayRegisterFor({
//   registerForRecipient,
//   recovery,
//   expiration,
//   signature,
//   username,
//   pathToRevalidate,
// }: RelayRegisterForProps) {
//   try {
//     const iface = new ethers.Interface(idRegistryABI)
//     const data = iface.encodeFunctionData('registerFor', [
//       registerForRecipient,
//       recovery,
//       expiration.toString(),
//       signature,
//     ])

//     const registerTxn = {
//       to: addresses.idRegistry.nova, 
//       data: data, 
//       gasLimit: ethers.hexlify('1000000'),
//       maxPriorityFeePerGas: ethers.parseUnits('2', 'gwei'), 
//       maxFeePerGas: ethers.parseUnits('100', 'gwei'),
//     }

//     const response = await defenderClient.relaySigner.sendTransaction(registerTxn)

//     console.log('reigeter txn: ', registerTxn)
//     // wait for txn receipt
//     const txnReceipt = await publicClient.waitForTransactionReceipt({
//       hash: response.hash as Hex ,
//     })
//     const [rid, recoveryAddress] = decodeAbiParameters(
//       [
//         { name: 'rid', type: 'uint256' },
//         { name: 'recoveryAddress', type: 'address' },
//       ],
//       txnReceipt.logs[0].data,
//     )
//     console.log('rid: ', rid)
//     console.log('transaction receipt: ', txnReceipt)
//     // console.log("topics", txnReceipt.logs[0].topics)
//     // console.log("topics 1: ", txnReceipt)
//     // console.log("topics 2: ", txnReceipt)
//     // extract userId from logs
//     // const userIdRegistered = parseInt(
//     //   txnReceipt.logs[0].topics[2] as string,
//     //   16
//     // )
//     //
//     // console.log("userId registered", rid)
//     // set username in username db
//     await setUsername({
//       userIdRegistered: String(rid),
//       signature: signature,
//       timestamp: expiration.toString(),
//       username: username,
//       registerForRecipient: registerForRecipient,
//     })

//     // userIdRegistered: string
//     // username: string
//     // registerForRecipient: Hex
//     // signature: Hex
//     // timestamp: string
//     // to?: string

//     // If writeContract + setUsername were successful, registerFor txn is valid and we proceed to check its inclusion
//     const txnInclusion = await getTxnInclusion(response.hash as Hex)
//     // Check if the transaction is successfully included
//     if (txnInclusion) {
//       // If txnInclusion is true, the transaction was found and processed
//       console.log(`Transaction ${registerTxn} was processed by ponder`)
//       // Revalidate path. This is typically for cache invalidation.
//       revalidatePath(pathToRevalidate)
//       return true // Return true to indicate successful processing
//     } else {
//       // If txnInclusion is false, the transaction was not found or not processed
//       console.log(`Transaction ${registerTxn} NOT found by ponder`)
//       return false // Return false to indicate the transaction was not processed
//     }
//   } catch (error) {
//     // Catch and log any errors that occur during the txn processing or username setting
//     console.error('Error in user registration: ', error)
//     return false // Return false to indicate failure due to an error
//   }
// }
