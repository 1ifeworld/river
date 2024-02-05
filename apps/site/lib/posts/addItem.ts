import { sha256 } from "multiformats/hashes/sha2";
import { SignMessageModalUIOptions } from "@privy-io/react-auth";
import {
  getExpiration,
  generateMessageHash,
  remove0xPrefix,
  encodeAddItemMsgBody,
} from "scrypt";
import { Hash, Hex } from "viem";
import * as Block from "multiformats/block";
import * as dagCbor from "@ipld/dag-cbor";

type Message = {
  rid: bigint;
  timestamp: bigint;
  msgType: number;
  msgBody: Hash;
};

type Post = {
  signer: Hex;
  message: Message;
  hashType: number;
  hash: Hash;
  sigType: number;
  sig: Hash;
};

export async function prepAddItem({
  itemCid,
  channelCid,
  rid,
  signer,
  privySignMessage,
}: {
  itemCid: string;
  channelCid: string;
  rid: bigint;
  signer: Hex;
  privySignMessage: (
    message: string,
    uiOptions?: SignMessageModalUIOptions | undefined
  ) => Promise<string>;
}) {
  // Generate Message struct + cid
  const timestamp = getExpiration();
  const addItemMsgType: number = 5;
  const addItemMsgBody = encodeAddItemMsgBody({
    itemCid: itemCid,
    channelCid: channelCid,
  });
  /* FIGURE OUT IF NEED TO STRINGIFY THINGS */
  const addItemMessage: Message = {
    timestamp: timestamp,
    rid: rid,
    msgType: addItemMsgType,
    msgBody: addItemMsgBody?.msgBody as Hash,
  };
  // Encode messageCID
  const { cid: messageCID } = await Block.encode({
    value: addItemMessage,
    codec: dagCbor,
    hasher: sha256,
  });
  // generate hash to include in post
  const addItemMessageHash = generateMessageHash({
    rid: rid,
    timestamp: timestamp,
    msgType: addItemMsgType,
    msgBody: addItemMsgBody?.msgBody as Hash,
  });
  const addItemMsgHashForSig = remove0xPrefix({
    bytes32Hash: addItemMessageHash,
  });
  // Get signature from user over signed hash of encodePacked version + expiration + messages
  const addItemSig = (await privySignMessage(addItemMsgHashForSig)) as Hash;
  const addItemPost: Post = {
    signer: signer,
    message: {
      rid: rid,
      timestamp: timestamp,
      msgType: addItemMsgType,
      msgBody: addItemMsgBody?.msgBody as Hash,
    },
    hashType: 1,
    hash: addItemMessageHash,
    sigType: 1,
    sig: addItemSig,
  };
  const { cid: postCID } = await Block.encode({
    value: addItemPost,
    codec: dagCbor,
    hasher: sha256,
  });
  return {
    postForTxn: addItemPost,
    addMsgCID: messageCID,
    addPostCID: postCID,
  };
}
