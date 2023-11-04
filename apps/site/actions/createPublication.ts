'use server'

import { type Hex, type Hash } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { nodeRegistry } from '@/constants'
import { publicClient, walletClient } from '@/config'
import { nodeRegistryAbi } from '@/abi'
import { } from 'river-contracts/out/'


export async function createPublication() {

    const { request } = await publicClient.simulateContract({
      address: nodeRegistry,
      abi: nodeRegistryAbi,
      functionName: 'registerNode',
      // uint256 userId // uint256 nodeId // uint256 msgType // bytes msgBody
      args: [
        // Why does this expect a Hex type?
        userId as Hex
        // userId,
        // nodeId,
        // msgType,
        // msgBody,
      ],
    })
  
    console.log('Message node request', request)
  
    await walletClient.writeContract(request)
  }