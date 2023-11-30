import { Hash, slice } from "viem";

//////////////////////////////////////////////////
// ENCODING
//////////////////////////////////////////////////

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
