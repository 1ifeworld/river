import { Hash, Hex } from "viem";

export type Message = {
  rid: bigint;
  timestamp: bigint;
  msgType: number;
  msgBody: Hash;
};

export type Post = {
  signer: Hex;
  message: Message;
  hashType: number;
  hash: Hash;
  sigType: number;
  sig: Hash;
};

export enum ChannelDataTypes {
  NONE,
  NAME_AND_DESC,
}

export enum ChannelAccessTypes {
  NONE,
  ROLES,
}

export enum ItemDataTypes {
  NONE,
  STRING_URI,
}

export enum ItemAccessTypes {
  NONE,
  ROLES,
}

export enum MessageTypes {
  NONE, // 0
  CREATE_ITEM, // 1
  UPDATE_ITEM, // 2
  CREATE_CHANNEL, // 3
  UPDATE_CHANNEL, // 4
  ADD_ITEM_TO_CHANNEL, // 5
  REMOVE_ITEM_FROM_CHANNEL, // 6
}
