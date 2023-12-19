import { Hash } from 'viem'

export function remove0xPrefix({ bytes32Hash }: { bytes32Hash: Hash }) {
    return bytes32Hash.slice(2)
  }
  