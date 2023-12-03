import { Hash, decodeAbiParameters, encodeAbiParameters } from 'viem'

//////////////////////////////////////////////////
// ENCODING
//////////////////////////////////////////////////

export function encodePub({ uri }: { uri: string }): {
  msgBody: Hash
} | null {
  try {
    const msgBody = encodeAbiParameters(
      [{ name: 'uri', type: 'string' }],
      [uri],
    )

    return {
      msgBody: msgBody,
    }
  } catch (error) {
    console.error('Failed to encode publication', error)
    return null
  }
}

//////////////////////////////////////////////////
// DECODING
//////////////////////////////////////////////////
