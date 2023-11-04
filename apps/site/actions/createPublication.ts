'use server'

import { type Hex, type Hash, encodeAbiParameters } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { nodeRegistry } from '@/constants'
import { nodeRegistryAbi } from '@/abi'
import { publicClient, walletClient } from '@/config'
import {
  adminWithMembersABI,
  nodeRegistryTypesABI,
  publicationMessageTypesABI,
} from '@/abi'

export async function createPublication() {
  // Register Publication node
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
        schema:
          '0x1234567890123456789012345678901234567890123456789012345678901234' as Hash,
        userId: BigInt(1),
        msgType: BigInt(1),
        msgBody: encodedAdminInitializeStruct,
      },
    ],
  )

  const { request: registerPublication } = await publicClient.simulateContract({
    address: nodeRegistry,
    abi: nodeRegistryAbi,
    functionName: 'registerNode',
    args: [encodedNodeRegistrationStruct],
  })

  const registerPublicationHash = await walletClient.writeContract(
    registerPublication,
  )

  console.log('Register publication hash:', registerPublicationHash)

  const encodedPublicationUriStruct = encodeAbiParameters(
    publicationMessageTypesABI[0].outputs,
    [
      {
        uri: 'uri',
      },
    ],
  )

  // Message Publication node
  const encodedNodeCallStruct = encodeAbiParameters(
    nodeRegistryTypesABI[0].outputs,
    [
      {
        nodeId: BigInt(1),
        userId: BigInt(1),
        msgType: BigInt(1),
        msgBody: encodedPublicationUriStruct,
      },
    ],
  )

  const { request: callPublication } = await publicClient.simulateContract({
    address: nodeRegistry,
    abi: nodeRegistryAbi,
    functionName: 'messageNode',
    args: [encodedNodeCallStruct],
  })

  const callPublicationHash = await walletClient.writeContract(callPublication)

  console.log('Register publication hash:', callPublicationHash)
}

createPublication()
