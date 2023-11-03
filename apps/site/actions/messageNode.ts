'use server'

import { type Hex } from 'viem'

import { nodeRegistry } from '@/constants'
import { publicClient, walletClient } from '@/config'
import { nodeRegistryAbi } from '@/abi'
import { optimismGoerli } from 'viem/chains'

export async function messageNode({ userId }: { userId: Hex }) {
  const { request } = await publicClient.simulateContract({
    address: nodeRegistry,
    abi: nodeRegistryAbi,
    functionName: 'messageNode',
    // uint256 userId // uint256 nodeId // uint256 msgType // bytes msgBody
    args: [
      // Why does this expect a Hex type?
      userId,
      // nodeId,
      // msgType,
      // msgBody,
    ],
  })

  await walletClient.writeContract(request)
}
