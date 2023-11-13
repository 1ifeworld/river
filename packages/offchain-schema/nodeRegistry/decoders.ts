import { Hash, Hex, decodeAbiParameters } from "viem";
import {
  messageTypeABI,
  access_100TypesABI,
  publication_200TypesABI,
  channel_300TypesABI,
} from "../abi";

//////////////////////////////////////////////////
// 000 MESSAGE DECODERS
//////////////////////////////////////////////////

export function decodeMessage000({ encodedMsg }: { encodedMsg: Hash }): {
  userId: bigint;
  msgType: bigint;
  msgBody: Hash;
} | null {
  try {
    const [userId, msgType, msgBody] = decodeAbiParameters(
      messageTypeABI[0].outputs, // generic Message type
      encodedMsg
    );

    return {
      userId: userId,
      msgType: msgType,
      msgBody: msgBody,
    };
  } catch (error) {
    // If an error is caught during decoding, return null.
    console.error("Failed to decode Message", error);
    return null;
  }
}

//////////////////////////////////////////////////
// 100 ACCESS DECODERS
//////////////////////////////////////////////////

export function decodeAccess101({ msgBody }: { msgBody: Hash }): {
  admins: readonly bigint[];
  members: readonly bigint[];
} | null {
  try {
    const [admins, members] = decodeAbiParameters(
      access_100TypesABI[0].outputs, // setup AdminWithMembers
      msgBody
    );

    return {
      admins: admins,
      members: members,
    };
  } catch (error) {
    // If an error is caught during decoding, return null.
    console.error("Failed to decode Message", error);
    return null;
  }
}

//////////////////////////////////////////////////
// 200 PUBLICATION DECODERS
//////////////////////////////////////////////////

export function decodePublication201({ msgBody }: { msgBody: Hash }): {
  uri: string;
} | null {
  try {
    const [uri] = decodeAbiParameters(
      publication_200TypesABI[0].outputs, // setUri
      msgBody
    );

    return {
      uri: uri,
    };
  } catch (error) {
    // If an error is caught during decoding, return null.
    console.error("Failed to decode MsgType: 201", error);
    return null;
  }
}

//////////////////////////////////////////////////
// 300 CHANNEL DECODERS
//////////////////////////////////////////////////

export function decodeChannel301({ msgBody }: { msgBody: Hash }): {
  uri: string;
} | null {
  try {
    const [uri] = decodeAbiParameters(
      channel_300TypesABI[0].outputs, // setUri
      msgBody
    );

    return {
      uri: uri,
    };
  } catch (error) {
    // If an error is caught during decoding, return null.
    console.error("Failed to decode MsgType: 301", error);
    return null;
  }
}

export function decodeChannel302({ msgBody }: { msgBody: Hash }): {
  chainId: bigint;
  id: bigint;
  pointer: Hex;
  hasId: boolean;
} | null {
  try {
    const [chainId, id, pointer, hasId] = decodeAbiParameters(
      channel_300TypesABI[1].outputs, // addItem
      msgBody
    );

    return {
      chainId: chainId,
      id: id,
      pointer: pointer,
      hasId: hasId,
    };
  } catch (error) {
    // If an error is caught during decoding, return null.
    console.error("Failed to decode MsgType: 302", error);
    return null;
  }
}

export function decodeChannel303({ msgBody }: { msgBody: Hash }): {
  index: bigint;
} | null {
  try {
    const [index] = decodeAbiParameters(
      channel_300TypesABI[2].outputs, // removeItem
      msgBody
    );

    return {
      index: index,
    };
  } catch (error) {
    // If an error is caught during decoding, return null.
    console.error("Failed to decode MsgType: 303", error);
    return null;
  }
}
