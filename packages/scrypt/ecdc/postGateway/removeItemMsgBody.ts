import { type Hash, decodeAbiParameters, encodeAbiParameters } from 'viem'
import { postGatewayABI } from '../../abi'

//////////////////////////////////////////////////
// ENCODING
//////////////////////////////////////////////////

export function encodeRemoveItemMsgBody({
  itemCid,
  channelCid,
}: {
  itemCid: string
  channelCid: string
}): {
  msgBody: Hash
} | null {
  try {
    const msgBody = encodeAbiParameters(postGatewayABI[8].outputs, [
      { itemCid, channelCid },
    ])

    return {
      msgBody: msgBody,
    }
  } catch (error) {
    console.error('Failed to encode add remove item Message body', error)
    return null
  }
}

//////////////////////////////////////////////////
// DECODING
//////////////////////////////////////////////////

export function decodeRemoveItemMsgBody({ msgBody }: { msgBody: Hash }): {
  itemCid: string
  channelCid: string
} | null {
  try {
    const [{ itemCid, channelCid }] = decodeAbiParameters(
      postGatewayABI[8].outputs,
      msgBody,
    )

    return {
      itemCid: itemCid,
      channelCid: channelCid,
    }
  } catch (error) {
    console.error('Failed to decode remove item Message body', error)
    return null
  }
}
