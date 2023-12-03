import { Hash, decodeAbiParameters } from 'viem'

//////////////////////////////////////////////////
// ENCODING
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// DECODING
//////////////////////////////////////////////////

export function decodeAccess({ msgBody }: { msgBody: Hash }): {
  adminIds: readonly bigint[]
  memberIds: readonly bigint[]
} | null {
  try {
    const [adminIds, memberIds] = decodeAbiParameters(
      [
        { name: 'adminIds', type: 'uint256[]' },
        { name: 'memberIds', type: 'uint256[]' },
      ],
      msgBody,
    )

    return {
      adminIds: adminIds,
      memberIds: memberIds,
    }
  } catch (error) {
    console.error('Failed to decode access', error)
    return null
  }
}
