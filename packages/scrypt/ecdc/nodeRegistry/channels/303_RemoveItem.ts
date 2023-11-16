import { Hash, Hex, decodeAbiParameters, encodeAbiParameters } from 'viem'
import { channel_300TypesABI, messageTypeABI } from '../../../abi'

//////////////////////////////////////////////////
// ENCODING
//////////////////////////////////////////////////

export function encodeChannel303({ channelIndex }: { channelIndex: bigint }): {
  message: Hash
} | null {
  try {
    const encodedMsg = encodeAbiParameters(messageTypeABI[0].outputs, [
      BigInt(303),
      encodeAbiParameters(channel_300TypesABI[2].outputs, [channelIndex]),
    ])

    return { message: encodedMsg }
  } catch (error) {
    console.error('Failed to encode Channel_303', error)
    return null
  }
}

//////////////////////////////////////////////////
// DECODING
//////////////////////////////////////////////////

export function decodeChannel303({ msgBody }: { msgBody: Hash }): {
  index: bigint
} | null {
  try {
    const [index] = decodeAbiParameters(channel_300TypesABI[2].outputs, msgBody)

    return {
      index: index,
    }
  } catch (error) {
    console.error('Failed to decode Channel_303', error)
    return null
  }
}
