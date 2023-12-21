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
