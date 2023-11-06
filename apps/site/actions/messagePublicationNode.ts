'use server'

import { encodeAbiParameters } from 'viem'
import { 
  nodeRegistry,
  nodeRegistryTypesABI,
  publicationMessageTypesABI,
  nodeRegistryABI
} from 'offchain-schema'
import { publicClient, walletClient } from '@/config'

export async function messagePublicationNode(nodeId: bigint) {
    const encodedPublicationUriStruct = encodeAbiParameters(
        publicationMessageTypesABI[0].outputs,
        [
          {
            uri: 'ipfs://bafybeidw4rmzno2ovlppggmhoal3tvuzi2ufbtaudyc37jqnj5pm5fyble/1',
          },
        ],
      )
    
      // Message Publication node
      const encodedNodeCallStruct = encodeAbiParameters(
        nodeRegistryTypesABI[0].outputs,
        [
          {
            nodeId: nodeId,
            userId: BigInt(1),
            msgType: BigInt(1),
            msgBody: encodedPublicationUriStruct,
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

messagePublicationNode(BigInt(11))



