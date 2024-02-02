import { Hash, decodeAbiParameters, Hex } from "viem";
import { postGateway2ABI } from "../../abi";

//////////////////////////////////////////////////
// DECODING
//////////////////////////////////////////////////

export function decodeAddItemMsgBody({ msgBody }: { msgBody: Hash }): {
  itemCid: string;
  channelCid: string;
} | null {
  try {
    const [{ itemCid, channelCid }] = decodeAbiParameters(
      postGateway2ABI[0].outputs,
      msgBody
    );

    return {
      itemCid: itemCid,
      channelCid: channelCid,
    };
  } catch (error) {
    console.error("Failed to decode add item Message body", error);
    return null;
  }
}
