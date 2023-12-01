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
        { type: "int256" },    // pubId -- negative value possible for releative referencing
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