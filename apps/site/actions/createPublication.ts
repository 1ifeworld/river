'use server'

import { type Hex, type Hash, encodeAbiParameters } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { nodeRegistry } from '@/constants'
import { nodeRegistryAbi } from '@/abi'
import { publicClient, walletClient } from '@/config'
import { adminWithMembersABI } from '@/abi'

export const adminWithMembersAbi = [{
  components: [
    {
      internalType: 'uint256',
      name: 'admin',
      type: 'uint256',
    },
    {
      internalType: 'uint256[]',
      name: 'members',
      type: 'uint256[]',
    },
  ],
  internalType: 'struct AdminWithMembers.Initialize_100',
  name: '',
  type: 'tuple',
}]  as const

export async function createPublication() {
  // Register Publication node
  const encodedAdminInitializeStruct = encodeAbiParameters(
    adminWithMembersABI[0].outputs[0].components[0].,
    // adminWithMembersAbi.abi[0].outputs,
    [
      {
        admin: BigInt(1),
        members: [BigInt(2), BigInt(4)],
      },
    ],
  )

  const encodedNodeRegistrationStruct = encodeAbiParameters(
    nodeRegistryTypesAbi.abi[1].outputs,
    [
      {
        schema:
          '0x1234567890123456789012345678901234567890123456789012345678901234' as Hash,
        userId: 1,
        msgType: 1,
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

  // console.log('Register publication request', registerPublication)

  const hash = await walletClient.writeContract(registerPublication)

  console.log(hash)

  // Part two

  // const encodedPublicationUriStruct = encodeAbiParameters(
  //   publicationMessageTypesAbi.abi[0].outputs,
  //   [
  //     {
  //       uri: 'uri',
  //     },
  //   ],
  // )

  // // Message Publication node
  // const encodedNodeCallStruct = encodeAbiParameters(
  //   nodeRegistryTypesAbi.abi[0].outputs,
  //   [
  //     {
  //       nodeId: 1,
  //       userId: 1,
  //       msgType: 1,
  //       msgBody: encodedPublicationUriStruct,
  //     },
  //   ],
  // )

  // const { request: callPublication } = await publicClient.simulateContract({
  //   address: nodeRegistry,
  //   abi: nodeRegistryAbi,
  //   functionName: 'messageNode',
  //   args: [encodedNodeCallStruct],
  // })

  // await walletClient.writeContract(callPublication)
}

createPublication()