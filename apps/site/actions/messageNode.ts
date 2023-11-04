'use server'

import { type Hex, type Hash } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { nodeRegistry } from '@/constants'
import { publicClient, walletClient } from '@/config'
import { nodeRegistryAbi } from '@/abi'

// { userId }: { userId: Hex }
export async function messageNode(formData: FormData) {
  // console.log('Suppled id', userId)

  console.log('Form data', formData)

  const userId = formData.get('userId')

  console.log('User id', userId)

  const { request } = await publicClient.simulateContract({
    address: nodeRegistry,
    abi: nodeRegistryAbi,
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
