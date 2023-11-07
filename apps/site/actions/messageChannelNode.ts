'use server'

import { encodeAbiParameters } from 'viem'
import {
  nodeRegistry,
  nodeRegistryTypesABI,
  channelMessageTypesABI,
  nodeRegistryABI,
} from 'offchain-schema'
import { publicClient, walletClient } from '@/config'

export async function messageChannelNode(nodeId: bigint) {
  const encodedItemStruct = encodeAbiParameters(
    channelMessageTypesABI[0].outputs,
    [
      {
        pointer: {
          chainId: BigInt(420),
          id: BigInt(1),
          target: '0x532f7DB02D2ebE12f2CDdfAcDa807FD9B2D96F66',
          hasId: true,
        },
      },
    ],
  )

  // Message Channel node
  const encodedNodeCallStruct = encodeAbiParameters(
    nodeRegistryTypesABI[0].outputs,
    [
      {
        nodeId: nodeId,
        userId: BigInt(1),
        msgType: BigInt(1),
        msgBody: encodedItemStruct,
      },
    ],
  )

  const { request: callPublication } = await publicClient.simulateContract({
    address: nodeRegistry,
    abi: nodeRegistryABI,
    functionName: 'messageNode',
    args: [encodedNodeCallStruct],
  })

  const callPublicationHash = await walletClient.writeContract(callPublication)

  console.log('Message publication hash:', callPublicationHash)
}

messageChannelNode(BigInt(13))
