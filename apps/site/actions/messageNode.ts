'use server'

import { type Hex, type Hash } from 'viem'
import { nodeRegistry, nodeRegistryABI } from 'offchain-schema'
import { publicClient, walletClient } from '@/config'

// { userId }: { userId: Hex }
export async function messageNode(formData: FormData) {
  // console.log('Suppled id', userId)

  console.log('Form data', formData)

  const userId = formData.get('userId')

  console.log('User id', userId)

  const { request } = await publicClient.simulateContract({
    address: nodeRegistry,
    abi: nodeRegistryABI,
    functionName: 'messageNode',
    // uint256 userId // uint256 nodeId // uint256 msgType // bytes msgBody
    args: [
      // Why does this expect a Hex type?
      userId as Hex,
      // userId,
      // nodeId,
      // msgType,
      // msgBody,
    ],
  })

  console.log('Message node request', request)

  await walletClient.writeContract(request)
}
