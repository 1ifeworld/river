import { Hash, decodeAbiParameters, encodeAbiParameters } from 'viem'

//////////////////////////////////////////////////
// ENCODING
//////////////////////////////////////////////////

export function encodeCreatePublication({
  uri,
  channelTags,
}: { uri: string; channelTags: bigint[] }): {
  msgBody: Hash
} | null {
  try {
    const msgBody = encodeAbiParameters(
      [
        { name: 'uri', type: 'string' },
        { name: 'channelTags', type: 'uint256[]' },
      ],
      [uri, channelTags],
    )

    return {
      msgBody: msgBody,
    }
  } catch (error) {
    console.error('Failed to encode CreatePublication', error)
    return null
  }
}

export function encodeReferencePublication({
  targetPublication,
  channelTags,
}: { targetPublication: bigint; channelTags: bigint[] }): {
  msgBody: Hash
} | null {
  try {
    const msgBody = encodeAbiParameters(
      [
        { name: 'targetPublication', type: 'uint256' },
        { name: 'channelTags', type: 'uint256[]' },
      ],
      [targetPublication, channelTags],
    )

    return {
      msgBody: msgBody,
    }
  } catch (error) {
    console.error('Failed to encode ReferencePublication', error)
    return null
  }
}

//////////////////////////////////////////////////
// DECODING
//////////////////////////////////////////////////

export function decodeCreatePublication({ msgBody }: { msgBody: Hash }): {
  uri: string
  channelTags: readonly bigint[]
} | null {
  try {
    const [uri, channelTags] = decodeAbiParameters(
      [
        { name: 'uri', type: 'string' },
        { name: 'channelTags', type: 'uint256[]' },
      ],
      msgBody,
    )

    return {
      uri: uri,
      channelTags: channelTags,
    }
  } catch (error) {
    console.error('Failed to decode CreatePublication', error)
    return null
  }
}

export function decodeReferencePublication({ msgBody }: { msgBody: Hash }): {
  targetPublication: bigint
  channelTags: readonly bigint[]
} | null {
  try {
    const [targetPublication, channelTags] = decodeAbiParameters(
      [
        { name: 'targetPublication', type: 'uint256' },
        { name: 'channelTags', type: 'uint256[]' },
      ],
      msgBody,
    )

    return {
      targetPublication: targetPublication,
      channelTags: channelTags,
    }
  } catch (error) {
    console.error('Failed to decode ReferencePublication', error)
    return null
  }
}
