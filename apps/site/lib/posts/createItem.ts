import { CID } from "multiformats/cid";
import * as raw from "multiformats/codecs/raw";
import { sha256 } from "multiformats/hashes/sha2";
import { SignMessageModalUIOptions } from "@privy-io/react-auth";
import { encodeCreateAssetMsgBody, getExpiration, generateMessageHash, remove0xPrefix } from "scrypt";
import { encodeAbiParameters, Hash, Hex } from "viem";
import * as Block from "multiformats/block";
import * as dagCbor from "@ipld/dag-cbor";

type Message = {
  rid: bigint;
  timestamp: bigint;
  msgType: number;
  msgBody: Hash;
};

type Post = {
    signer: Hex
    message: Message
    hashType: number
    hash: Hash
    sigType: number
    sig: Hash
  }

export async function prepCreateItem({
  file,
  rid,
  signer,
  privySignMessage,
}: {
  file: File;
  rid: bigint;
  signer: Hex;
  privySignMessage: (
    message: string,
    uiOptions?: SignMessageModalUIOptions | undefined
  ) => Promise<string>;
}) {
  // Generate fileCID
  const fileBuffer = await file.arrayBuffer();
  const fileBytesArray = new Uint8Array(fileBuffer);
  const hash = await sha256.digest(raw.encode(fileBytesArray));
  const fileCID = CID.create(1, raw.code, hash)
  //  const fileCID = Block.encode({ value: fileBytesArray, codec: raw, hasher: sha256 })
  // Generate Message struct + cid
  const timestamp = getExpiration();
  const createItemMsgType: number = 1;
  const createItemMsgBody = encodeCreateAssetMsgBody({
    data: {
      dataType: 1,
      contents: encodeAbiParameters(
        [{ name: "itemUri", type: "string" }],
        [fileCID.toString()]
      ),
    },
    access: {
      accessType: 1,
      // CHANGE THIS ROLE SETTING ****
      contents: encodeAbiParameters(
        [{ name: "admins", type: "uint256[]" }],
        [[rid]]
      ),
    },
  });
  // if (!createItemMsgBody?.msgBody) return false;
  /* FIGURE OUT IF NEED TO STRINGIFY THINGS */
  const createItemMessage: Message = {
    timestamp: timestamp,
    rid: rid,
    msgType: createItemMsgType,
    msgBody: createItemMsgBody?.msgBody as Hash,
  };
  // Encode messageCID
  const { cid: messageCID } = await Block.encode({
    value: createItemMessage,
    codec: dagCbor,
    hasher: sha256,
  });
  // Generate message hash + signagure
  const createItemMessageHash = generateMessageHash({
    rid: rid,
    timestamp: timestamp,
    msgType: createItemMsgType,
    msgBody: createItemMsgBody?.msgBody as Hash,
  })  
  const createItemMsgHashForSig = remove0xPrefix({
    bytes32Hash: createItemMessageHash,
  })
  // Get signature from user over signed hash of encodePacked version + expiration + messages
  const createItemSig = (await privySignMessage(
    createItemMsgHashForSig,
  )) as Hash
  // Create Message Post
  const createItemPost: Post = {
    signer: signer,
    message: {
      rid: BigInt(rid),
      timestamp: timestamp,
      msgType: createItemMsgType,
      msgBody: createItemMsgBody?.msgBody as Hash,
    },
    hashType: 1,
    hash: createItemMessageHash,
    sigType: 1,
    sig: createItemSig,
  }
  // Encode postCid
  const { cid: postCID } = await Block.encode({
    value: createItemPost,
    codec: dagCbor,
    hasher: sha256,
  });  

  return {
    postForTxn: createItemPost,
    fileCID: fileCID,
    itemMsgCID: messageCID,
    itemPostCID: postCID
  }
}