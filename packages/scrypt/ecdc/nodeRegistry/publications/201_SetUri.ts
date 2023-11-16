import { Hash, decodeAbiParameters, encodeAbiParameters } from 'viem'
import { publication_200TypesABI, messageTypeABI } from '../../../abi'

//////////////////////////////////////////////////
// ENCODING
//////////////////////////////////////////////////

export function encodePublication201({ pubUri }: { pubUri: string }): {
  message: Hash
} | null {
  try {
    const encodedMsg = encodeAbiParameters(messageTypeABI[0].outputs, [
      BigInt(201),
      encodeAbiParameters(publication_200TypesABI[0].outputs, [pubUri]),
    ])

    return { message: encodedMsg }
  } catch (error) {
    console.error('Failed to encode Publication_201', error)
    return null
  }
}

//////////////////////////////////////////////////
// DECODING
//////////////////////////////////////////////////

export function decodePublication201({ msgBody }: { msgBody: Hash }): {
  uri: string
} | null {
  try {
    const [uri] = decodeAbiParameters(
      publication_200TypesABI[0].outputs,
      msgBody,
    )

    return {
      uri: uri,
    }
  } catch (error) {
    console.error('Failed to decode Publication_201', error)
    return null
  }
}
