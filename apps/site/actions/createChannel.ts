'use server'

import { type Hash, encodeFunctionData } from 'viem'
import {
  addresses,
  // encodeAccess101,
  // encodeChannel301,
  // nodeRegistryABI,
} from 'scrypt'
import { nonceManager } from '@/config/ethersClient'

interface CreateChannelProps {
  userId: bigint
  adminIds: bigint[]
  memberIds: bigint[]
  channelUri: string
}

export async function createChannel({
  userId,
  adminIds,
  memberIds,
  channelUri,
}: CreateChannelProps) {
  // const accessControlMessage = encodeAccess101({ adminIds, memberIds })

  // const channelUriMessage = encodeChannel301({ channelUri })

  // const registerEncodedData = encodeFunctionData({
  //   abi: nodeRegistryABI,
  //   functionName: 'register',
  //   args: [
  //     userId,
  //     channelSchema,
  //     [
  //       accessControlMessage?.message as Hash,
  //       channelUriMessage?.message as Hash,
  //     ],
  //   ],
  // })

  // try {
  //   const regTxn = await nonceManager.sendTransaction({
  //     to: addresses.nodeRegistry.opGoerli,
  //     data: registerEncodedData,
  //   })
  //   const regTxnReceipt = await regTxn.wait()
  //   console.log('Register transaction receipt: ', regTxnReceipt)
  // } catch (error) {
  //   console.error('Register transaction failed: ', error)
  // }
}
