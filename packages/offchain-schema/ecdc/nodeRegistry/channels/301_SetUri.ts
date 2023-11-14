import { Hash, decodeAbiParameters, encodeAbiParameters } from "viem";
import { channel_300TypesABI } from "../../../abi";

//////////////////////////////////////////////////
// ENCODING
//////////////////////////////////////////////////

export function encodeChannel301({ channelUri }: { channelUri: string }): {
  msgBody: Hash;
} | null {
  try {
    const encodedMsg = encodeAbiParameters(channel_300TypesABI[0].outputs, [
      channelUri,
    ]);

    return { msgBody: encodedMsg };
  } catch (error) {
    console.error("Failed to encode Channel_301", error);
    return null;
  }
}

//////////////////////////////////////////////////
// DECODING
//////////////////////////////////////////////////

export function decodeChannel301({ msgBody }: { msgBody: Hash }): {
  uri: string;
} | null {
  try {
    const [uri] = decodeAbiParameters(
      channel_300TypesABI[0].outputs,
      msgBody
    );

    return {
      uri: uri,
    };
  } catch (error) {
    console.error("Failed to decode Channel_301", error);
    return null;
  }
}