'use server'

import { encodeAbiParameters } from 'viem'
import {
  nodeRegistry,
  publicationSchema,
  channelSchema,
  adminWithMembersABI,
  nodeRegistryTypesABI,
  publicationMessageTypesABI,
  nodeRegistryABI,
} from 'offchain-schema'
import { publicClient, walletClient } from '@/config'

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
        schema: publicationSchema,
        // schema: channelSchema,
        userId: BigInt(1),
        msgType: BigInt(1),
        msgBody: encodedAdminInitializeStruct,
      },
    ],
  )

  // const { request: registerPublication } = await publicClient.simulateContract({
  //   address: nodeRegistry,
  //   abi: nodeRegistryABI,
  //   functionName: 'registerNode',
  //   args: [encodedNodeRegistrationStruct],
  // })

  // const registerPublicationHash = await walletClient.writeContract(
  //   registerPublication,
  // )

  // console.log('Register publication hash:', registerPublicationHash)

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
        nodeId: BigInt(10),
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

createPublication()
