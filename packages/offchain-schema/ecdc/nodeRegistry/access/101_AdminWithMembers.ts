import { Hash, encodeAbiParameters, decodeAbiParameters } from "viem";
import { access_100TypesABI } from "../../../abi";

//////////////////////////////////////////////////
// ENCODING
//////////////////////////////////////////////////

export function encodeAccess101({
  adminIds,
  memberIds,
}: {
  adminIds: bigint[];
  memberIds: bigint[];
}): {
  msgBody: Hash;
} | null {
  try {
    const encodedMsg = encodeAbiParameters(access_100TypesABI[0].outputs, [
      adminIds,
      memberIds,
    ]);

    return { msgBody: encodedMsg };
  } catch (error) {
    console.error("Failed to encode Access_101", error);
    return null;
  }
}

//////////////////////////////////////////////////
// DECODING
//////////////////////////////////////////////////

export function decodeAccess101({ msgBody }: { msgBody: Hash }): {
  admins: readonly bigint[];
  members: readonly bigint[];
} | null {
  try {
    const [admins, members] = decodeAbiParameters(
      access_100TypesABI[0].outputs,
      msgBody
    );

    return {
      admins: admins,
      members: members,
    };
  } catch (error) {
    console.error("Failed to decode Access_101", error);
    return null;
  }
}
