import { Hash, slice, encodePacked, decodeAbiParameters, Hex } from 'viem'
import { postGateway2ABI } from '../../abi'

//////////////////////////////////////////////////
// DECODING
//////////////////////////////////////////////////

export function decodeCreateAssetMsgBody({
  msgBody,
}: {
    msgBody: Hash
}): {
  data: { dataType: number, contents: Hex},
  access: { accessType: number, contents: Hex}
} | null {
  try {

    const [{data, access}] = decodeAbiParameters(
        postGateway2ABI[1].outputs,
        msgBody
    )

    return {
      data: data,
      access: access,
    }
  } catch (error) {
    console.error('Failed to decode create asset Message body', error)
    return null
  }
}
