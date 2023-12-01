import { Hash, Address, decodeAbiParameters } from "viem";
import { TargetType } from "../../constants";
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

export function decodeItemNew({ msgBody }: { msgBody: Hash }): {
  itemType: TargetType;
  itemBody: Hash;
} | null {
  try {
    const [itemType, itemBody] = decodeAbiParameters(
      [
        { type: "uint32" },   // itemType
        { type: "bytes" },    // itemBody
      ],
      msgBody
    );


    if (itemType === 1) {
      return {
        itemType: TargetType.PUB,
        itemBody: itemBody
      };    
    } else if (itemType === 2) {
      return {
        itemType: TargetType.NFT,
        itemBody: itemBody
      };   
    } else if (itemType === 3) {
      return {
        itemType: TargetType.URL,
        itemBody: itemBody
      };       
    } else {
        throw Error("invalid item type")
    }    
  } catch (error) {
    console.error("Failed to decode Item new", error);
    return null;
  }
}

export function decodePublication({ itemBody }: { itemBody: Hash }): {
  pubId: bigint;
} | null {
  try {
    const [pubId] = decodeAbiParameters(
      [
        { type: "uint256" },    // pubId
      ],
      itemBody
    );

    return {
      pubId: pubId,
    };
  } catch (error) {
    console.error("Failed to decode PUB", error);
    return null;
  }
}

export function decodeNFT({ itemBody }: { itemBody: Hash }): {
  chainId: bigint;
  target: Address;
  hasId: boolean;
  id: bigint;
} | null {
  try {
    const [chainId, target, hasId, id] = decodeAbiParameters(
      [
        { type: "uint256" },    // chainId
        { type: "address" },    // pointer
        { type: "bool" },       // hasId
        { type: "uint256" }     // id
      ],
      itemBody
    );

    return {
      chainId: chainId,
      target: target,
      hasId: hasId,
      id: id,
    };
  } catch (error) {
    console.error("Failed to decode NFT", error);
    return null;
  }
}