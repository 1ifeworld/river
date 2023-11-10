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

export async function createChannel(userId: bigint, formData?: FormData) {
  // TODO: Ensure members are actually being passed through
  // const members = formData.get('members')
  console.log('userId', userId)

  const encodedAdminInitializeStruct = encodeAbiParameters(
    adminWithMembersABI[0].outputs,
    [
      {
        admin: userId,
        // TODO: Replace with members object
        members: [BigInt(2), BigInt(4)],
      },
    ],
  )

  const encodedNodeRegistrationStruct = encodeAbiParameters(
    nodeRegistryTypesABI[1].outputs,
    [
      {
        schema: channelSchema,
        userId: userId,
        msgType: BigInt(1),
        msgBody: encodedAdminInitializeStruct,
      },
    ],
  )

  const { request: registerChannel } = await publicClient.simulateContract({
    address: nodeRegistry,
    abi: nodeRegistryABI,
    functionName: 'registerNode',
    args: [encodedNodeRegistrationStruct],
  })

  // console.log(registerChannel)

  const registerChannelHash = await walletClient.writeContract(registerChannel)

  console.log('Register channel hash:', registerChannelHash)
}

createChannel(BigInt(38))
