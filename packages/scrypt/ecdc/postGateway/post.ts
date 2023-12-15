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
  hashType,
  hash,
  sigType,
  sig,
  version,
  expiration,
  messageArray,
}: {
  userId: bigint
  hashType: number
  hash: Hash
  sigType: number
  sig: Hash
  version: number
  expiration: bigint
  messageArray: Hash[]
}): Hash | null {
  try {
    const encodedPostInput = encodePacked(
      [
        'uint256',
        'uint8',
        'bytes',
        'uint8',
        'bytes',
        'uint16',
        'uint64',
        'bytes',
      ],
      [
        userId,
        hashType,
        hash,
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
  hashType: bigint
  hash: Hash
  sigType: bigint
  sig: Hash
  version: bigint
  expiration: bigint
  messageArray: readonly Hash[]
} | null {
  try {
    const deconstructedPostInput: {
      userId: Hash
      hashType: Hash
      hash: Hash
      sigType: Hash
      sig: Hash
      version: Hash
      expiration: Hash
      encodedMessageArray: Hash
    } = {
      userId: slice(postInput, 0, 32, { strict: true }),
      hashType: slice(postInput, 32, 33, { strict: true }),
      // NOTE: in future, need to add conditional logic here based on hash type
      hash: slice(postInput, 33, 65, { strict: true }),
      sigType: slice(postInput, 65, 66, { strict: true }),
      // NOTE: in future, need to add conditional logic here based on sig type
      // Hardcoded ecdsa length
      sig: slice(postInput, 66, 131, { strict: true }),
      version: slice(postInput, 131, 133, { strict: true }),
      expiration: slice(postInput, 133, 141, { strict: true }),
      encodedMessageArray: slice(postInput, 141),
    }

    const [decodedMessageArray] = decodeAbiParameters(
      [{ name: 'messageArray', type: 'bytes[]' }],
      deconstructedPostInput.encodedMessageArray,
    )

    return {
      userId: BigInt(deconstructedPostInput.userId),
      hashType: BigInt(parseInt(deconstructedPostInput.hashType, 16)),
      hash: deconstructedPostInput.hash,
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
