'use server'

import { type Hex, type Hash, encodeAbiParameters } from 'viem'
import {
  addresses,
  publicationSchema,
  encodeAccess101,
  encodePublication201,
  nodeRegistryABI,
} from 'scrypt'
import { publicClient } from '@/config/publicClient'
import { walletClient, serverSidePublicClient } from '@/config/walletClient'

interface CreatePublicationProps {
  userId: bigint
  adminIds: bigint[]
  memberIds: bigint[]
  pubUri: string
}

export async function createPublication({
  userId,
  adminIds,
  memberIds,
  pubUri,
}: CreatePublicationProps) {
  const accessControlMessage = encodeAccess101({ adminIds, memberIds })

  const publicationUriMessage = encodePublication201({ pubUri })

  const { request } = await serverSidePublicClient.simulateContract({
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

  const registerHash = await walletClient.writeContract(request)

  console.log('Register hash:', registerHash)
}
