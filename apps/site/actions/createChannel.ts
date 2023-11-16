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

  const transactionCount = await walletClient.getTransactionCount({
    address: '0x004991c3bbcF3dd0596292C80351798965070D75',
  })

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
    chain: opGoerliViem,
    nonce: transactionCount,
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
    nonce: 190,
  })

  console.log('Register hash:', registerHash)
}
