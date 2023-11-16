'use server'

import { type Hash } from 'viem'
import {
  addresses,
  channelSchema,
  encodeAccess101,
  encodeChannel301,
  nodeRegistryABI,
} from 'scrypt'
import { walletClient } from '@/config/walletClient'
import { opGoerliViem } from 'constants/chains'

interface CreateChannelProps {
  userId: bigint
  adminIds: bigint[]
  memberIds: bigint[]
  channelUri: string
}

export async function createChannel({
  userId,
  adminIds,
  memberIds,
  channelUri,
}: CreateChannelProps) {
  const accessControlMessage = encodeAccess101({ adminIds, memberIds })

  const channelUriMessage = encodeChannel301({ channelUri })

  const { request } = await walletClient.simulateContract({
    address: addresses.nodeRegistry.opGoerli,
    abi: nodeRegistryABI,
    functionName: 'register',
    args: [
      userId,
      channelSchema,
      [
        accessControlMessage?.message as Hash,
        channelUriMessage?.message as Hash,
      ],
    ],
  })

  // const registerHash = await walletClient.writeContract(request)

  const registerHash = await walletClient.writeContract({
    address: addresses.nodeRegistry.opGoerli,
    abi: nodeRegistryABI,
    functionName: 'register',
    args: [
      userId,
      channelSchema,
      [
        accessControlMessage?.message as Hash,
        channelUriMessage?.message as Hash,
      ],
    ],
  })

  console.log('Register hash:', registerHash)
}
