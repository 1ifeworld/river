import { Hash, decodeAbiParameters, encodeAbiParameters } from 'viem'

//////////////////////////////////////////////////
// ENCODING
//////////////////////////////////////////////////

export function encodeCreateChannel({
  uri,
  adminIds,
  memberIds,
  channelTags,
}: {
  uri: string
  adminIds: bigint[]
  memberIds: bigint[]
  channelTags: bigint[]
}): {
  msgBody: Hash
} | null {
  try {
    const msgBody = encodeAbiParameters(
      [
        { name: 'uri', type: 'string' },
        { name: 'adminIds', type: 'uint256[]' },
        { name: 'memberIds', type: 'uint256[]' },
        { name: 'channelTags', type: 'uint256[]' },
      ],
      [uri, adminIds, memberIds, channelTags],
    )

    return {
      msgBody: msgBody,
    }
  } catch (error) {
    console.error('Failed to encoded Create Channel', error)
    return null
  }
}

export function encodeeferenceChannel({
  channelTarget,
  channelTags,
}: { channelTarget: bigint; channelTags: readonly bigint[] }): {
  msgBody: Hash
} | null {
  try {
    const msgBody = encodeAbiParameters(
      [
        { name: 'channelTarget', type: 'uint256' },
        { name: 'channelTags', type: 'uint256[]' },
      ],
      [channelTarget, channelTags],
    )

    return {
      msgBody: msgBody,
    }
  } catch (error) {
    console.error('Failed to encode Reference Channels', error)
    return null
  }
}

//////////////////////////////////////////////////
// DECODING
//////////////////////////////////////////////////

export function decodeCreateChannel({ msgBody }: { msgBody: Hash }): {
  uri: string
  adminIds: readonly bigint[]
  memberIds: readonly bigint[]
  channelTags: readonly bigint[]
} | null {
  try {
    const [uri, adminIds, memberIds, channelTags] = decodeAbiParameters(
      [
        { name: 'uri', type: 'string' },
        { name: 'adminIds', type: 'uint256[]' },
        { name: 'memberIds', type: 'uint256[]' },
        { name: 'channelTags', type: 'uint256[]' },
      ],
      msgBody,
    )

    return {
      uri: uri,
      adminIds: adminIds,
      memberIds: memberIds,
      channelTags: channelTags,
    }
  } catch (error) {
    console.error('Failed to decode CreateChannel', error)
    return null
  }
}

export function decodeReferenceChannel({ msgBody }: { msgBody: Hash }): {
  channelTarget: bigint
  channelTags: readonly bigint[]
} | null {
  try {
    const [channelTarget, channelTags] = decodeAbiParameters(
      [
        { name: 'channelTarget', type: 'uint256' },
        { name: 'channelTags', type: 'uint256[]' },
      ],
      msgBody,
    )

    return {
      channelTarget: channelTarget,
      channelTags: channelTags,
    }
  } catch (error) {
    console.error('Failed to decode Reference Channels', error)
    return null
  }
}
