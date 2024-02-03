
import { SignMessageModalUIOptions } from "@privy-io/react-auth";
import { Hash, Hex, encodeAbiParameters } from "viem";
import { newRelayBatchPost } from "@/lib";
import {
  getExpiration,
  remove0xPrefix,
  generateMessageHash,
  encodeCreateAssetMsgBody,
  encodeAddItemMsgBody,
  createBlockFromAnything
} from "scrypt";

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

export async function processBatchCreateAddItemPost({
  signer,
  rid,
  itemUri,
  channelId,
  privySignMessage,
}: {
  signer: Hex;
  rid: bigint;
itemUri: string;
channelId: string;
  privySignMessage: (
    message: string,
    uiOptions?: SignMessageModalUIOptions | undefined
  ) => Promise<string>;
}): Promise<boolean> {
    // generic values
    const timestamp = getExpiration()
    /*
        CREATE ITEM POST
    */
    const createItemMsgType: number = 1;
    const createItemMsgBody = encodeCreateAssetMsgBody({
        data: {
            dataType: 1,
            contents: encodeAbiParameters(
                [{name: "itemUri", type: "string"}],
                [itemUri]    
            )
        },
        access: {
            accessType: 1,
            contents: encodeAbiParameters(
                [{name: "admins", type: "uint256[]"}],
                [[rid]]    
            )            
        }
    })
    if (!createItemMsgBody?.msgBody) return false;
  // generate hash to include in post
  const createItemMessageHash = generateMessageHash({
    rid: rid,
    timestamp: timestamp,
    msgType: createItemMsgType,
    msgBody: createItemMsgBody.msgBody,
  });
  const createItemMsgHashForSig = remove0xPrefix({ bytes32Hash: createItemMessageHash });
  // Get signature from user over signed hash of encodePacked version + expiration + messages
  const createItemSig = (await privySignMessage(createItemMsgHashForSig)) as Hash;    
  const createItemPost: Post = {
    signer: signer,
    message: {
        rid: BigInt(rid),
        timestamp: timestamp,
        msgType: createItemMsgType,
        msgBody: createItemMsgBody.msgBody
    },
    hashType: 1,
    hash: createItemMessageHash,
    sigType: 1,
    sig: createItemSig
  }
  const itemBlock = await createBlockFromAnything(createItemPost.message);
  const itemCid = itemBlock.cid.toString()
  console.log("site site item message strucT: ", {
    rid: BigInt(rid),
    timestamp: timestamp,
    msgType: createItemMsgType,
    msgBody: createItemMsgBody.msgBody
})
console.log("site site item cid: ", itemCid)

    /*
        ADD ITEM POST
    */  
    const addItemMsgType: number = 5;
    const addItemMsgBody = encodeAddItemMsgBody({
        itemCid: itemCid,
        channelCid: channelId
    })
    if (!addItemMsgBody?.msgBody) return false;
    // generate hash to include in post
    const addItemMessageHash = generateMessageHash({
        rid: rid,
        timestamp: timestamp,
        msgType: addItemMsgType,
        msgBody: addItemMsgBody.msgBody,
    });
    const addItemMsgHashForSig = remove0xPrefix({ bytes32Hash: addItemMessageHash });
    // Get signature from user over signed hash of encodePacked version + expiration + messages
    const addItemSig = (await privySignMessage(addItemMsgHashForSig)) as Hash;    
    const addItemPost: Post = {
        signer: signer,
        message: {
            rid: rid,
            timestamp: timestamp,
            msgType: addItemMsgType,
            msgBody: addItemMsgBody.msgBody
        },
        hashType: 1,
        hash: addItemMessageHash,
        sigType: 1,
        sig: addItemSig
    }
  const relaySuccess =  newRelayBatchPost({
    posts: [createItemPost, addItemPost],
    pathsToRevalidate: ["/"]
  })
  // return relay success boolean value
  return relaySuccess;
}
