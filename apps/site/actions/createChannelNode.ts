'use server'

import { encodeAbiParameters } from 'viem'
import {
  nodeRegistry,
  channelSchema,
  adminWithMembersABI,
  nodeRegistryTypesABI,
  nodeRegistryABI,
} from 'offchain-schema'
import { publicClient, walletClient } from '@/config'

export async function createChannelNode() {
  // Register Channel node
  const encodedAdminInitializeStruct = encodeAbiParameters(
    adminWithMembersABI[0].outputs,
    [
      {
        admin: BigInt(1),
        members: [BigInt(2), BigInt(4)],
      },
    ],
  )

  const encodedNodeRegistrationStruct = encodeAbiParameters(
    nodeRegistryTypesABI[1].outputs,
    [
      {
        schema: channelSchema,
        userId: BigInt(1),
        msgType: BigInt(1),
        msgBody: encodedAdminInitializeStruct,
      },
    ],
  )

  const { request: registerPublication } = await publicClient.simulateContract({
    address: nodeRegistry,
    abi: nodeRegistryABI,
    functionName: 'registerNode',
    args: [encodedNodeRegistrationStruct],
  })

  const registerPublicationHash = await walletClient.writeContract(
    registerPublication,
  )

  console.log('Register publication hash:', registerPublicationHash)
}

createChannelNode()
