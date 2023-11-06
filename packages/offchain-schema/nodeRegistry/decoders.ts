import { Hash, Hex, decodeAbiParameters } from "viem";
import {
  nodeRegistryTypesABI,
  adminWithMembersABI,
  publicationMessageTypesABI,
  channelMessageTypesABI,
} from "../abi";

//////////////////////////////////////////////////
// NODE REGISTRATION
//////////////////////////////////////////////////

export function decodeNodeRegistrationData({ data }: { data: Hash }): {
  schema: Hash;
  userId: bigint;
  msgType: bigint;
  msgBody: Hash;
} | null {
  try {
    const [decodedData] = decodeAbiParameters(
      nodeRegistryTypesABI[1].outputs,
      data
    );

    return decodedData;
  } catch (error) {
    // If an error is caught during decoding, return null.
    console.error("Failed to decode node registration data:", error);
    return null;
  }
}

export function decodeAdminWithMembersData({
  msgType,
  msgBody,
}: {
  msgType: bigint;
  msgBody: Hash;
}): {
  admin: bigint;
  members: readonly bigint[];
} | null {
  try {
    const [decodedData] = decodeAbiParameters(
      adminWithMembersABI[0].outputs,
      msgBody
    );

    return decodedData;
  } catch (error) {
    // If an error is caught during decoding or casting, return null.
    console.error("Failed to decode admin with members data:", error);
    return null;
  }
}

//////////////////////////////////////////////////
// NODE CALL
//////////////////////////////////////////////////

export function decodeNodeCallData({ data }: { data: Hash }): {
  nodeId: bigint;
  userId: bigint;
  msgType: bigint;
  msgBody: Hash;
} | null {
  try {
    const [decodedData] = decodeAbiParameters(
      nodeRegistryTypesABI[0].outputs,
      data
    );

    return decodedData;
  } catch (error) {
    // If an error is caught during decoding, return null.
    console.error("Failed to decode node call data:", error);
    return null;
  }
}

/***  PUBLICATION SPECIFIC ***/

export function decodeMessagePublicationData({
  msgType,
  msgBody,
}: {
  msgType: bigint;
  msgBody: Hash;
}): {
  uri: string;
} | null {
  try {
    const [decodedData] = decodeAbiParameters(
      publicationMessageTypesABI[0].outputs,
      msgBody
    );

    return decodedData;
  } catch (error) {
    // If an error is caught during decoding, return null.
    console.error("Failed to decode message Publication data:", error);
    return null;
  }
}
/***  CHANNEL SPECIFIC ***/

export function decodeMessageChannelData({
  msgType,
  msgBody,
}: {
  msgType: bigint;
  msgBody: Hash;
}): {
  chainId: bigint,
  id: bigint,
  target: Hex,
  hasId: boolean
} | null {
  try {
    const [chainId, id, target, hasId] = decodeAbiParameters(
      channelMessageTypesABI[0].outputs[0].components[0].components,
      msgBody
    );

    return {
      chainId: chainId,
      id: id,
      target: target,
      hasId: hasId
    }
  } catch (error) {
    // If an error is caught during decoding, return null.
    console.error("Failed to decode message Channel data:", error);
    return null;
  }
}
