import {
  Hash,
  decodeAbiParameters,
  encodeAbiParameters,
  encodePacked,
  slice,
} from 'viem'
import { postABI } from '../../abi'

//////////////////////////////////////////////////
// ENCODING
//////////////////////////////////////////////////

export function encodePost({
  userId,
  sigType,
  sig,
  version,
  expiration,
  messageArray,
}: {
  userId: bigint
  sigType: number
  sig: Hash
  version: number
  expiration: bigint
  messageArray: Hash[]
}): Hash | null {
  try {
    const encodedPostInput = encodePacked(
      ['uint256', 'uint8', 'bytes', 'uint16', 'uint64', 'bytes'],
      [
        userId,
        sigType,
        sig,
        version,
        expiration,
        encodeAbiParameters(
          [{ name: 'messageArray', type: 'bytes[]' }],
          [messageArray],
        ),
      ],
    )

    return encodedPostInput
  } catch (error) {
    console.error('Failed to encode Post', error)
    return null
  }
}

//////////////////////////////////////////////////
// DECODING
//////////////////////////////////////////////////

export function decodePost({ postInput }: { postInput: Hash }): {
  userId: bigint
  sigType: bigint
  sig: Hash
  version: bigint
  expiration: bigint
  messageArray: readonly Hash[]
} | null {
  try {
    const deconstructedPostInput: {
      userId: Hash
      sigType: Hash
      sig: Hash
      version: Hash
      expiration: Hash
      encodedMessageArray: Hash
    } = {
      userId: slice(postInput, 0, 32, { strict: true }),
      sigType: slice(postInput, 32, 33, { strict: true }),
      sig: slice(postInput, 33, 98, { strict: true }),
      version: slice(postInput, 98, 100, { strict: true }),
      expiration: slice(postInput, 100, 108, { strict: true }),
      encodedMessageArray: slice(postInput, 108),
    }

    const [decodedMessageArray] = decodeAbiParameters(
      [{ name: 'messageArray', type: 'bytes[]' }],
      deconstructedPostInput.encodedMessageArray,
    )

    return {
      userId: BigInt(deconstructedPostInput.userId),
      sigType: BigInt(parseInt(deconstructedPostInput.sigType, 16)),
      sig: deconstructedPostInput.sig,
      version: BigInt(parseInt(deconstructedPostInput.version, 16)),
      expiration: BigInt(parseInt(deconstructedPostInput.expiration, 16)),
      messageArray: decodedMessageArray,
    }
  } catch (error) {
    console.error('Failed to decode Post', error)
    return null
  }
}
