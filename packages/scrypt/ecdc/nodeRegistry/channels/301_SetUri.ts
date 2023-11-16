import { Hash, decodeAbiParameters, encodeAbiParameters } from 'viem'
import { channel_300TypesABI, messageTypeABI } from '../../../abi'

//////////////////////////////////////////////////
// ENCODING
//////////////////////////////////////////////////

export function encodeChannel301({ channelUri }: { channelUri: string }): {
  message: Hash
} | null {
  try {
    const encodedMsg = encodeAbiParameters(messageTypeABI[0].outputs, [
      BigInt(301),
      encodeAbiParameters(channel_300TypesABI[0].outputs, [channelUri]),
    ])

    return { message: encodedMsg }
  } catch (error) {
    console.error('Failed to encode Channel_301', error)
    return null
  }
}

//////////////////////////////////////////////////
// DECODING
//////////////////////////////////////////////////

export function decodeChannel301({ msgBody }: { msgBody: Hash }): {
  uri: string
} | null {
  try {
    const [uri] = decodeAbiParameters(channel_300TypesABI[0].outputs, msgBody)

    return {
      uri: uri,
    }
  } catch (error) {
    console.error('Failed to decode Channel_301', error)
    return null
  }
}
