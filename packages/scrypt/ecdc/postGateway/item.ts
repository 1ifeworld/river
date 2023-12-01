import { Hash, Address, encodeAbiParameters, decodeAbiParameters } from "viem";
import { TargetType } from "../../constants";
import { itemABI } from "../../abi";

//////////////////////////////////////////////////
// ENCODING
//////////////////////////////////////////////////

export function encodeItem({
  itemType,
  itemBody,
}: {
  itemType: TargetType;
  itemBody: Hash;
}): {
  msgBody: Hash;
} | null {
  if (itemType === "PUB") {
    try {
      const msgBody = encodeAbiParameters(
        [
          { type: "uint32" }, // itemType
          { type: "bytes" }, // itemBody
        ],
        [1, itemBody]
      );
      return {
        msgBody: msgBody,
      };
    } catch (error) {
      console.error("Failed to decode PUB Item", error);
      return null;
    }
  }
  if (itemType === "NFT") {
    try {
      const msgBody = encodeAbiParameters(
        [
          { type: "uint32" }, // itemType
          { type: "bytes" }, // itemBody
        ],
        [2, itemBody]
      );
      return {
        msgBody: msgBody,
      };
    } catch (error) {
      console.error("Failed to decode NFT Item", error);
      return null;
    }
  }
  if (itemType === "URL") {
    try {
      const msgBody = encodeAbiParameters(
        [
          { type: "uint32" }, // itemType
          { type: "bytes" }, // itemBody
        ],
        [3, itemBody]
      );
      return {
        msgBody: msgBody,
      };
    } catch (error) {
      console.error("Failed to decode URL Item", error);
      return null;
    }
  } else {
    throw Error("invalid item type");
  }
}

export function encodeAddPubItemBody({
  targetChannelId,
  targetPubId,
}: {
  targetChannelId: bigint;
  targetPubId: bigint;
}): {
  itemBody: Hash;
} | null {
  try {
    const itemBody = encodeAbiParameters(
      [
        { name: "targetChannelId", type: "int256" },
        { name: "targetPubId", type: "int256" },
      ],
      [targetChannelId, targetPubId]
    );

    return {
      itemBody: itemBody,
    };
  } catch (error) {
    console.error("Failed to encode add item and access", error);
    return null;
  }
}

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
        { type: "uint32" }, // itemType
        { type: "bytes" }, // itemBody
      ],
      msgBody
    );

    if (itemType === 1) {
      return {
        itemType: TargetType.PUB,
        itemBody: itemBody,
      };
    } else if (itemType === 2) {
      return {
        itemType: TargetType.NFT,
        itemBody: itemBody,
      };
    } else if (itemType === 3) {
      return {
        itemType: TargetType.URL,
        itemBody: itemBody,
      };
    } else {
      throw Error("invalid item type");
    }
  } catch (error) {
    console.error("Failed to decode Item new", error);
    return null;
  }
}

export function decodePubItem({ itemBody }: { itemBody: Hash }): {
  pubId: bigint;
} | null {
  try {
    const [pubId] = decodeAbiParameters(
      [
        { type: "int256" }, // pubId -- negative value possible for releative referencing
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

export function decodeNFTItem({ itemBody }: { itemBody: Hash }): {
  chainId: bigint;
  target: Address;
  hasId: boolean;
  id: bigint;
} | null {
  try {
    const [chainId, target, hasId, id] = decodeAbiParameters(
      [
        { type: "uint256" }, // chainId
        { type: "address" }, // pointer
        { type: "bool" }, // hasId
        { type: "uint256" }, // id
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
