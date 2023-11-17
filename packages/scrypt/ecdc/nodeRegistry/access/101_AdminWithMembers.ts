import { Hash, encodeAbiParameters, decodeAbiParameters } from 'viem'
import { access_100TypesABI, messageTypeABI } from '../../../abi'

//////////////////////////////////////////////////
// ENCODING
//////////////////////////////////////////////////

export function encodeAccess101({
  adminIds,
  memberIds,
}: {
  adminIds: bigint[]
  memberIds: bigint[]
}): {
  message: Hash
} | null {
  try {
    const encodedMsg = encodeAbiParameters(messageTypeABI[0].outputs, [
      BigInt(101),
      encodeAbiParameters(access_100TypesABI[0].outputs, [adminIds, memberIds]),
    ])

    return { message: encodedMsg }
  } catch (error) {
    console.error('Failed to encode Access_101', error)
    return null
  }
}

//////////////////////////////////////////////////
// DECODING
//////////////////////////////////////////////////

export function decodeAccess101({ msgBody }: { msgBody: Hash }): {
  admins: readonly bigint[]
  members: readonly bigint[]
} | null {
  try {
    const [admins, members] = decodeAbiParameters(
      access_100TypesABI[0].outputs,
      msgBody,
    )

    return {
      admins: admins,
      members: members,
    }
  } catch (error) {
    console.error('Failed to decode Access_101', error)
    return null
  }
}
