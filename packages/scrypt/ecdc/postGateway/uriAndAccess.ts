import { Hash, decodeAbiParameters } from "viem";

//////////////////////////////////////////////////
// ENCODING
//////////////////////////////////////////////////

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
