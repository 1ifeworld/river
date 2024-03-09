import { Hash, encodeAbiParameters } from 'viem'
import { postGatewayABI } from '../../abi'

export async function encodeCreateChannelMsgBody({
  name,
  description,
  members,
  roles,
}: {
  name: string
  description: string
  members: bigint[]
  roles: bigint[]
}): Promise<{ msgBody: Hash } | null> {
  try {
    const encodedCreateChannelStruct = encodeAbiParameters(
      postGatewayABI[4].outputs,
      [
        {
          data: {
            dataType: 1,
            contents: encodeAbiParameters(
              [
                { name: 'name', type: 'string' },
                { name: 'description', type: 'string' },
              ],
              [name, description],
            ),
          },
          access: {
            accessType: 1,
            contents: encodeAbiParameters(
              [
                { name: 'members', type: 'uint256[]' },
                { name: 'roles', type: 'uint256[]' },
              ],
              [members, roles],
            ),
          },
        },
      ],
    )

    return {
      msgBody: encodedCreateChannelStruct,
    }
  } catch (error) {
    console.error('Failed to encode create channel msgBody', error)
    return null
  }
}
