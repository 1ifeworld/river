import {
    Hash,
    decodeAbiParameters,
    encodeAbiParameters,
    encodePacked,
    slice,
  } from 'viem'
  import { postGateway2ABI } from '../../abi'
  
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