'use server'

import { type Hash, encodeFunctionData } from 'viem'
import {
  addresses,
  // publicationSchema,
  // encodeAccess101,
  // encodePublication201,
  // encodeChannel302,
  // nodeRegistryABI,
} from 'scrypt'
import { nonceManager } from '@/config/ethersClient'

interface CreatePublicationProps {
  userId: bigint
  adminIds: bigint[]
  memberIds: bigint[]
  pubUri: string
  nodeId: bigint
}

export async function createPublication({
  userId,
  adminIds,
  memberIds,
  pubUri,
  nodeId,
}: CreatePublicationProps) {
  /**
   * Encode necessary function data to register a node
   */
  // const accessControlMessage = encodeAccess101({ adminIds, memberIds })
  // const publicationUriMessage = encodePublication201({ pubUri })
  // const registerEncodedData = encodeFunctionData({
  //   abi: nodeRegistryABI,
  //   functionName: 'register',
  //   args: [
  //     userId,
  //     publicationSchema,
  //     [
  //       accessControlMessage?.message as Hash,
  //       publicationUriMessage?.message as Hash,
  //     ],
  //   ],
  // })
  // // Initialize a variable to hold the nodeId after successful registration
  // let pubNodeIdCreated
  // /**
  //  * Process the registration call
  //  */
  // try {
  //   const regTxn = await nonceManager.sendTransaction({
  //     to: addresses.nodeRegistry.opGoerli,
  //     data: registerEncodedData,
  //   })
  //   const regTxnReceipt = await regTxn.wait()
  //   pubNodeIdCreated = parseInt(regTxnReceipt?.logs[0].topics[3] as string, 16)
  //   console.log('pubNodeIdCreated: ', pubNodeIdCreated)
  // } catch (error) {
  //   console.error('Register transaction failed: ', error)
  // }
  // /**
  //  * If the registration transaction was successful, prepare and execute the update transaction
  //  */
  // if (pubNodeIdCreated) {
  //   const addItemMessage = encodeChannel302({
  //     chainId: BigInt(420),
  //     id: BigInt(pubNodeIdCreated),
  //     pointer: addresses.nodeRegistry.opGoerli,
  //     hasId: true,
  //   })
  //   const updateEncodedData = encodeFunctionData({
  //     abi: nodeRegistryABI,
  //     functionName: 'update',
  //     args: [userId, nodeId, [addItemMessage?.message as Hash]],
  //   })
  //   /**
  //    * Process the update call
  //    */
  //   try {
  //     const updTxn = await nonceManager.sendTransaction({
  //       to: addresses.nodeRegistry.opGoerli,
  //       data: updateEncodedData,
  //     })
  //     const updTxnReceipt = await updTxn.wait()
  //     console.log('updTxnReceipt: ', updTxnReceipt)
  //   } catch (error) {
  //     console.error('Update transaction failed: ', error)
  //   }
  // }
}
