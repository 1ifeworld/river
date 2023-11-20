'use server'

import { type Hex, type Hash, encodeAbiParameters } from 'viem'
import {
  addresses,
  publicationSchema,
  encodeAccess101,
  encodePublication201,
  encodeChannel302,
  nodeRegistryABI,
} from 'scrypt'
import { publicClient } from '@/config/publicClient'
import { walletClient, serverSidePublicClient } from '@/config/walletClient'

interface CreatePublicationProps {
  userId: bigint
  adminIds: bigint[]
  memberIds: bigint[]
  pubUri: string
  nodeId: bigint
}

export async function createPublication({
  userId,
  adminIds,
  memberIds,
  pubUri,
  nodeId,
}: CreatePublicationProps) {
  const accessControlMessage = encodeAccess101({ adminIds, memberIds })

  const publicationUriMessage = encodePublication201({ pubUri })

  const { request: registerRequest, result: registerResult } =
    await serverSidePublicClient.simulateContract({
      address: addresses.nodeRegistry.opGoerli,
      abi: nodeRegistryABI,
      functionName: 'register',
      args: [
        userId,
        publicationSchema,
        [
          accessControlMessage?.message as Hash,
          publicationUriMessage?.message as Hash,
        ],
      ],
    })

  console.log('Register result', registerResult)

  await walletClient.writeContract(registerRequest)

  const addItemMessage = encodeChannel302({
    chainId: BigInt(420),
    id: registerResult,
    pointer: addresses.nodeRegistry.opGoerli,
    hasId: true,
  })

  const { request: updateRequest, result: updateResult } =
    await serverSidePublicClient.simulateContract({
      address: addresses.nodeRegistry.opGoerli,
      abi: nodeRegistryABI,
      functionName: 'update',
      args: [userId, nodeId, [addItemMessage?.message as Hash]],
    })

  const updateHash = await walletClient.writeContract(updateRequest)

  console.log('Update hash:', updateHash)
}
