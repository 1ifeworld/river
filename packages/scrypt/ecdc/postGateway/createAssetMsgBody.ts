import {
  Hash,
  slice,
  encodePacked,
  decodeAbiParameters,
  Hex,
  encodeAbiParameters,
} from "viem";
import { postGateway2ABI } from "../../abi";

//////////////////////////////////////////////////
// ENCODING
//////////////////////////////////////////////////

export function encodeCreateAssetMsgBody({
  data,
  access,
}: {
  data: { dataType: number; contents: Hex };
  access: { accessType: number; contents: Hex };
}): {
  msgBody: Hash;
} | null {
  try {
    const msgBody = encodeAbiParameters(postGateway2ABI[1].outputs, [
      { data, access },
    ]);

    return {
      msgBody: msgBody,
    };
  } catch (error) {
    console.error("Failed to encode create asset Message body", error);
    return null;
  }
}

//////////////////////////////////////////////////
// DECODING
//////////////////////////////////////////////////

export function decodeCreateAssetMsgBody({ msgBody }: { msgBody: Hash }): {
  data: { dataType: number; contents: Hex };
  access: { accessType: number; contents: Hex };
} | null {
  try {
    const [{ data, access }] = decodeAbiParameters(
      postGateway2ABI[1].outputs,
      msgBody
    );

    return {
      data: data,
      access: access,
    };
  } catch (error) {
    console.error("Failed to decode create asset Message body", error);
    return null;
  }
}
