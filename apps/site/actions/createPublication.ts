'use server'

import { type Hex, type Hash, encodeAbiParameters } from 'viem'
import {
  addresses,
  publicationSchema,
  encodeAccess101,
  encodePublication201,
  nodeRegistryABI,
} from 'scrypt'
import { publicClient, walletClient } from '@/config'

interface CreatePublicationProps {
  userId: bigint
  adminIds: bigint[]
  memberIds: bigint[]
  pubUri: string
  // formData?: FormData
}

export async function createPublication({
  userId,
  adminIds,
  memberIds,
  pubUri,
  // formData
}: CreatePublicationProps) {
  const accessControlMessage = encodeAccess101({ adminIds, memberIds })

  const publicationUriMessage = encodePublication201({ pubUri })

  const { request } = await publicClient.simulateContract({
    address: addresses.nodeRegistry.opGoerli,
    abi: nodeRegistryABI,
    functionName: 'register',
    args: [
      userId,
      publicationSchema,
      [
        accessControlMessage?.msgBody as Hash,
        publicationUriMessage?.msgBody as Hash,
      ],
    ],
  })

  const registerPublicationHash = await walletClient.writeContract(request)

  console.log('Register publication hash:', registerPublicationHash)
}
