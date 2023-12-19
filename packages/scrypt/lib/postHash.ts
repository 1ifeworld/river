import { hashMessage, Hash, encodeAbiParameters } from 'viem'

export function generateHashForPostSig({
  version,
  expiration,
  messageArray,
}: {
  version: number
  expiration: bigint
  messageArray: Hash[]
}) {
  return hashMessage(
    encodeAbiParameters(
      [
        { name: 'version', type: 'uint16' },
        { name: 'expiration', type: 'uint64' },
        { name: 'messageArray', type: 'bytes[]' },
      ],
      [version, expiration, messageArray],
    ),
  )
}