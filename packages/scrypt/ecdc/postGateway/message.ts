import { Hash, slice, encodePacked } from "viem";
import { messageABI } from "../../abi";

//////////////////////////////////////////////////
// ENCODING
//////////////////////////////////////////////////

export function encodeMessage({
  msgType,
  msgBody
}: {
  msgType: number;
  msgBody: Hash;
}): {
  encodedMessage: Hash;
} | null {
  try {

    const encodedMessage = encodePacked(
      ["uint32", "bytes"],
      [msgType, msgBody]
    )

    return {
      encodedMessage: encodedMessage,
    };
  } catch (error) {
    console.error("Failed to encode Message", error);
    return null;
  }
}

//////////////////////////////////////////////////
// DECODING
//////////////////////////////////////////////////

export function decodeMessage({
  encodedMessage,
}: {
  encodedMessage: Hash;
}): {
  msgType: bigint;
  msgBody: Hash;
} | null {
  try {
    const decodedMsgType = BigInt(
      parseInt(slice(encodedMessage, 0, 4, { strict: true }), 16)
    );
    const decodedMsgBody = slice(encodedMessage, 4);

    return {
      msgType: decodedMsgType,
      msgBody: decodedMsgBody,
    };
  } catch (error) {
    console.error("Failed to decode Message", error);
    return null;
  }
}
