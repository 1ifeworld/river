import { Hash, decodeAbiParameters } from "viem";
import { messageTypeABI } from "../../../abi";

//////////////////////////////////////////////////
// 000 MESSAGE DECODERS
//////////////////////////////////////////////////

export function decodeMessage000({ encodedMsg }: { encodedMsg: Hash }): {
  msgType: bigint;
  msgBody: Hash;
} | null {
  try {
    const [msgType, msgBody] = decodeAbiParameters(
      messageTypeABI[0].outputs,
      encodedMsg
    );

    return {
      msgType: msgType,
      msgBody: msgBody,
    };
  } catch (error) {
    console.error("Failed to decode Message_000", error);
    return null;
  }
}
