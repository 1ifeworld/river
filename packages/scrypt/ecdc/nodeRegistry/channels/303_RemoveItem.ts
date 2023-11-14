import { Hash, Hex, decodeAbiParameters, encodeAbiParameters } from "viem";
import { channel_300TypesABI } from "../../../abi";

//////////////////////////////////////////////////
// ENCODING
//////////////////////////////////////////////////

export function encodeChannel303({ channelIndex }: { channelIndex: bigint }): {
  msgBody: Hash;
} | null {
  try {
    const encodedMsg = encodeAbiParameters(channel_300TypesABI[2].outputs, [
      channelIndex,
    ]);

    return { msgBody: encodedMsg };
  } catch (error) {
    console.error("Failed to encode Channel_303", error);
    return null;
  }
}

//////////////////////////////////////////////////
// DECODING
//////////////////////////////////////////////////

export function decodeChannel303({ msgBody }: { msgBody: Hash }): {
  index: bigint;
} | null {
  try {
    const [index] = decodeAbiParameters(
      channel_300TypesABI[2].outputs,
      msgBody
    );

    return {
      index: index,
    };
  } catch (error) {
    console.error("Failed to decode Channel_303", error);
    return null;
  }
}

