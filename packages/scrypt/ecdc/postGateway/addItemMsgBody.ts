import { type Hash, decodeAbiParameters, encodeAbiParameters } from 'viem'
import { postGatewayABI } from '../../abi'

//////////////////////////////////////////////////
// ENCODING
//////////////////////////////////////////////////

export function encodeAddItemMsgBody({
  itemCid,
  channelCid,
}: {
  itemCid: string
  channelCid: string
}): {
  msgBody: Hash
} | null {
  try {
    const msgBody = encodeAbiParameters(postGatewayABI[3].outputs, [
      { itemCid, channelCid },
    ])

    return {
      msgBody: msgBody,
    }
  } catch (error) {
    console.error('Failed to encode add item Message body', error)
    return null
  }
}

//////////////////////////////////////////////////
// DECODING
//////////////////////////////////////////////////

export function decodeAddItemMsgBody({ msgBody }: { msgBody: Hash }): {
  itemCid: string
  channelCid: string
} | null {
  try {
    const [{ itemCid, channelCid }] = decodeAbiParameters(
      postGatewayABI[3].outputs,
      msgBody,
    )

    return {
      itemCid: itemCid,
      channelCid: channelCid,
    }
  } catch (error) {
    console.error('Failed to decode add item Message body', error)
    return null
  }
}
