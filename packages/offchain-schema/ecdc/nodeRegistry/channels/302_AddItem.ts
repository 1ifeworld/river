import { Hash, Hex, decodeAbiParameters, encodeAbiParameters } from "viem";
import { channel_300TypesABI } from "../../../abi";

//////////////////////////////////////////////////
// ENCODING
//////////////////////////////////////////////////

export function encodeChannel302({
  chainId,
  id,
  pointer,
  hasId,
}: {
  chainId: bigint;
  id: bigint;
  pointer: Hex;
  hasId: boolean;
}): {
  msgBody: Hash;
} | null {
  try {
    const encodedMsg = encodeAbiParameters(channel_300TypesABI[1].outputs, [
      chainId,
      id,
      pointer,
      hasId,
    ]);

    return { msgBody: encodedMsg };
  } catch (error) {
    console.error("Failed to encode Channel_302", error);
    return null;
  }
}

//////////////////////////////////////////////////
// DECODING
//////////////////////////////////////////////////

export function decodeChannel302({ msgBody }: { msgBody: Hash }): {
  chainId: bigint;
  id: bigint;
  pointer: Hex;
  hasId: boolean;
} | null {
  try {
    const [chainId, id, pointer, hasId] = decodeAbiParameters(
      channel_300TypesABI[1].outputs,
      msgBody
    );

    return {
      chainId: chainId,
      id: id,
      pointer: pointer,
      hasId: hasId,
    };
  } catch (error) {
    console.error("Failed to decode Channel_302", error);
    return null;
  }
}