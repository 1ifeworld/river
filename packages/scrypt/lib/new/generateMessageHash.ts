import { hashMessage, Hash, encodeAbiParameters } from 'viem'

export function generateMessageHash({
  rid,
  timestamp,
  msgType,
  msgBody,
}: {
  rid: bigint
  timestamp: bigint
  msgType: number
  msgBody: Hash
}) {
  return hashMessage(
    encodeAbiParameters(
      [
        {
          name: 'message',
          internalType: 'struct IPostGateway2.Message',
          type: 'tuple',
          components: [
            { name: 'rid', internalType: 'uint256', type: 'uint256' },
            { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
            {
              name: 'msgType',
              internalType: 'enum IPostGateway2.MessageTypes',
              type: 'uint8',
            },
            { name: 'msgBody', internalType: 'bytes', type: 'bytes' },
          ],
        },
      ],
      [
        {
          rid: rid,
          timestamp: timestamp,
          msgType: msgType,
          msgBody: msgBody,
        },
      ],
    ),
  )
}
