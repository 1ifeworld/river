import { Hash, decodeAbiParameters, encodeAbiParameters } from "viem";

//////////////////////////////////////////////////
// ENCODING
//////////////////////////////////////////////////

export function encodeUriAndAccess({
  uri,
  adminIds,
  memberIds,
}: {
  uri: string;
  adminIds: bigint[];
  memberIds: bigint[];
}): {
  msgBody: Hash;
} | null {
  try {
    const msgBody = encodeAbiParameters(
      [
        { name: "uri", type: "string" },
        { name: "adminIds", type: "uint256[]" },
        { name: "memberIds", type: "uint256[]" },
      ],
      [uri, adminIds, memberIds]
    );

    return {
      msgBody: msgBody,
    };
  } catch (error) {
    console.error("Failed to encoded URI and access", error);
    return null;
  }
}

//////////////////////////////////////////////////
// DECODING
//////////////////////////////////////////////////

export function decodeUriAndAccess({ msgBody }: { msgBody: Hash }): {
  uri: string;
  adminIds: readonly bigint[];
  memberIds: readonly bigint[];
} | null {
  try {
    const [uri, adminIds, memberIds] = decodeAbiParameters(
      [
        { name: "uri", type: "string" },
        { name: "adminIds", type: "uint256[]" },
        { name: "memberIds", type: "uint256[]" },
      ],
      msgBody
    );

    return {
      uri: uri,
      adminIds: adminIds,
      memberIds: memberIds,
    };
  } catch (error) {
    console.error("Failed to decode URI and access", error);
    return null;
  }
}