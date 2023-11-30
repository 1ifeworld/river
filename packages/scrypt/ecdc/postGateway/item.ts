import { Hash, Address, decodeAbiParameters } from "viem";
import { itemABI } from "../../abi";

//////////////////////////////////////////////////
// ENCODING
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// DECODING
//////////////////////////////////////////////////

export function decodeItem({ msgBody }: { msgBody: Hash }): {
  chainId: bigint;
  target: Address;
  hasId: boolean;
  id: bigint;
  channelId: bigint;
} | null {
  try {
    const [chainId, target, hasId, id, channelId] = decodeAbiParameters(
      [
        { type: "uint256" }, // chainId
        { type: "address" }, // pointer
        { type: "bool" }, // hasId
        { type: "int256" }, // id -- negative values for relative referencing
        { type: "int256" }, // channelId -- negative values for relative referencing
      ],
      msgBody
    );

    return {
      chainId: chainId,
      target: target,
      hasId: hasId,
      id: id,
      channelId: channelId,
    };
  } catch (error) {
    console.error("Failed to decode Item", error);
    return null;
  }
}
