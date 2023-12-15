import { Hash, encodeAbiParameters, decodeAbiParameters } from 'viem'

export function encodeRemoveReference({
  channelId,
  referenceId,
}: {
  channelId: bigint
  referenceId: bigint
}): {
  msgBody: Hash
} | null {
  try {
    const msgBody = encodeAbiParameters(
      [
        { name: 'channelId', type: 'uint256' },
        { name: 'referenceId', type: 'uint256' },
      ],
      [channelId, referenceId],
    )

    return {
      msgBody: msgBody,
    }
  } catch (error) {
    console.error('Failed to encode RemoveReference', error)
    return null
  }
}

export function decodeRemoveReference({ msgBody }: { msgBody: Hash }): {
  channelId: bigint
  referenceId: bigint
} | null {
  try {
    const [channelId, referenceId] = decodeAbiParameters(
      [
        { name: 'channelId', type: 'uint256' },
        { name: 'referenceId', type: 'uint256' },
      ],
      msgBody,
    )

    return {
      channelId: channelId,
      referenceId: referenceId,
    }
  } catch (error) {
    console.error('Failed to decode RemoveReference', error)
    return null
  }
}
