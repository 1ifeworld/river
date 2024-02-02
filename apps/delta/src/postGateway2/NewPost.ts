import { ponder } from "@/generated";
import { postGateway2ABI, decodeCreateAssetMsgBody, decodeAddItemMsgBody } from "scrypt";
import {
  Hash,
  Hex,
  decodeFunctionData,
  recoverAddress,
  getAddress,
  decodeAbiParameters,
} from "viem";
import { absBigInt } from "../utils";
import {
  createBlockFromAnything,
  bytesToBase64Url,
  base64UrlToBytes,
} from "../utils/cid";
import * as codec from "@ipld/dag-cbor";
import * as Block from "multiformats/block";
import { sha256 } from "multiformats/hashes/sha2";

ponder.on("PostGateway:NewPost", async ({ event, context }) => {
  /* ************************************************

                    DATA STRUCTURES

  ************************************************ */

  const { Txn, User, Post, Message, Channel, ChannelRoles, Item, ItemRoles, Adds } = context.db;

  type Message = {
    rid: bigint;
    timestamp: bigint;
    msgType: number;
    msgBody: Hash;
  };

  type Post = {
    signer: Hex;
    message: Message;
    hashType: bigint;
    hash: Hash;
    sigType: bigint;
    sig: Hash;
  };  

  enum ChannelDataTypes {
    NONE,
    STRING_URI,
  }

  enum ChannelAccessTypes {
    NONE,
    ROLES,
  }

  enum ItemDataTypes {
    NONE,
    STRING_URI,
  }

  enum ItemAccessTypes {
    NONE,
    ADMINS,
  }

  enum MessageTypes {
    NONE, // 0
    CREATE_ITEM, // 1
    UPDATE_ITEM, // 2
    CREATE_CHANNEL, // 3
    UPDATE_CHANNEL, // 4
    ADD_ITEM_TO_CHANNEL, // 5
    REMOVE_ITEM_FROM_CHANNEL, // 6
  }  

  /* ************************************************

                  DYNAMIC VARIABLES

  ************************************************ */

  let txnReceipt: { id: `0x${string}` } | null = null;

  /* ************************************************

                      INTAKE

  ************************************************ */

  let posts: Post[] = [];

  const { args } = decodeFunctionData({
    abi: postGateway2ABI,
    data: event.transaction.input,
  });

  // Check if args is an array of posts or a batch of posts
  if (Array.isArray(args[0])) {
    const batchPost = args[0] as Post[];
    batchPost.forEach((post) => {
      posts.push(post);
    });
  } else {
    const singlePost = args[0] as Post;
    posts.push(singlePost);
  }

  console.log("posts: ", posts);

  // process every post -> associated message
  for (let i = 0; i < posts.length; ++i) {
    // check for message validity
    // check if timestamp is greater than 10 mins in the future of the block it was emitted din
    // NOTE: can potentially make this way lower in our blockchain era?
    if (posts[i].message.timestamp > event.block.timestamp + BigInt(600)) return;

    // get custody address from user id
    const userLookup = await User.findUnique({ id: posts[i].message.rid });

    if (!userLookup) return;

    // NOTE: update to context.client.verifyMessage to unlock support
    //       for smart accounts in addition to EOAs
    const recoveredAddress = await recoverAddress({
      hash: posts[i].hash,
      signature: posts[i].sig,
    });

    const signerIsValid = getAddress(userLookup.to) === recoveredAddress;

    if (!signerIsValid) return

    // Create blocks for things
    const postBlock = await createBlockFromAnything(posts[i]);
    console.log("postBlock.cid.toString()", postBlock.cid.toString())
    const messageBlock = await createBlockFromAnything(posts[i].message);
    // Create message id which will be saved in asset create events
    const messageId = messageBlock.cid.toString()
    // Save base64 encoded representatiosn of block bytes
    const encodedPostBlockBytes = bytesToBase64Url(postBlock.bytes);

    // store post + message
    const storedPost = await Post.create({
      id: postBlock.cid.toString(),
      data: {
        parentBlock: encodedPostBlockBytes,
        relayer: event.transaction.from,
        signer: posts[i].signer,
        messageId: messageId,
        hashType: BigInt(posts[i].hashType),
        hash: posts[i].hash,
        sigType: BigInt(posts[i].sigType),
        sig: posts[i].sig,
      },
    });

    const storedMessage = await Message.create({
      id: messageId,
      data: {
        rid: posts[i].message.rid,
        timestamp: posts[i].message.timestamp,
        msgType: BigInt(posts[i].message.msgType),
        msgBody: posts[i].message.msgBody,
      },
    });

    switch (posts[i].message.msgType) {
      case MessageTypes.CREATE_CHANNEL:
        // Create channelId from original message. channelId = cid(Message(rid, timestamp, msgType, msgBody))
        const channelId = messageBlock.cid.toString();
        console.log("channelId: ", channelId)
        // decode channel data + channel access
        const { data: channelData, access: channelAccess } =
          decodeCreateAssetMsgBody({ msgBody: posts[i].message.msgBody }) || {};
        // check to see if data type + access type are valid
        if (channelData?.dataType != ChannelDataTypes.STRING_URI) break;
        if (channelAccess?.accessType != ChannelAccessTypes.ROLES) break;
        // decode base64EncodedBytesUrl from data.contents  (if ChannelDataTypes.STRING_URI)
        const [channelInfoUri] = decodeAbiParameters(
          [{ name: "base64EncodedBytes", type: "string" }],
          channelData.contents
        );
        // decode base64EncodedBytesUrl and extract channel info
        const recreateBlockFromChannelUri = await Block.decode({
          bytes: base64UrlToBytes(channelInfoUri),
          codec: codec,
          hasher: sha256,
        });
        const channelInfo = recreateBlockFromChannelUri.value as {
          name: string;
          description: string;
        };
        // decode admins + members from access.contents (if ChannelAccessTypes.Roles)
        const [channelAdmins, channelMembers] = decodeAbiParameters(
          [
            { name: "channelAdmins", type: "uint256[]" },
            { name: "channelMembers", type: "uint256[]" },
          ],
          channelAccess.contents
        );
        // Create channel
        await Channel.create({
          id: channelId,
          data: {
            messageId: messageId,
            uri: channelInfoUri,
            name: channelInfo.name,
            description: channelInfo.description,
          },
        });
        // Store channel roles (ChannelAccessTypes.ROLES)
        let channelRolesStore: {
          id: string;
          channelId: string;
          rid: bigint;
          role: bigint;
        }[] = [];
        // build channelRolesStore for createMany
        for (let i = 0; i < channelAdmins.length; ++i) {
          channelRolesStore.push({
            id: `${channelId}/${channelAdmins[i]}`,
            channelId: channelId,
            rid: channelAdmins[i],
            role: BigInt(2),
          });
        }
        for (let i = 0; i < channelMembers.length; ++i) {
          channelRolesStore.push({
            id: `${channelId}/${channelMembers[i]}`,
            channelId: channelId,
            rid: channelMembers[i],
            role: BigInt(1),
          });
        }
        // Set roles
        await ChannelRoles.createMany({
          data: channelRolesStore,
        });
        // end case
        break;
      case MessageTypes.CREATE_ITEM:
        // Create itemId from original message. itemId = cid(Message(rid, timestamp, msgType, msgBody))
        const itemId = messageBlock.cid.toString();
        console.log("item cid:", itemId)
        // decode channel data + channel access
        const { data: itemData, access: itemAccess } =
          decodeCreateAssetMsgBody({ msgBody: posts[i].message.msgBody }) || {};
        // check to see if data type + access type are valid
        if (itemData?.dataType != ItemDataTypes.STRING_URI) break;
        if (itemAccess?.accessType != ItemAccessTypes.ADMINS) break;
        // decode item ipfs uri from itemData.conetnts
        const [itemUri] = decodeAbiParameters(
          [{ name: "itemIpfsCid", type: "string" }],
          itemData.contents
        );
        // decode admins + from access.contents (if ItemAccessTypes.ADMINS)
        const [itemAdmins] = decodeAbiParameters(
          [{ name: "admins", type: "uint256[]" }],
          itemAccess.contents
        );
        // Create item
        await Item.create({
          id: itemId,
          data: {
            messageId: messageId,
            uri: itemUri,
          },
        });
        // Store item roles (ItemAccessTypes.ADMINS)
        let itemAdminStore: {
          id: string;
          itemId: string;
          rid: bigint;
          role: bigint;
        }[] = [];        
        for (let i = 0; i < itemAdmins.length; ++i) {
          itemAdminStore.push({
            id: `${itemId}/${itemAdmins[i]}`,
            itemId: itemId,
            rid: itemAdmins[i],
            role: BigInt(2),
          });
        }        
        // Set roles
        await ItemRoles.createMany({
          data: itemAdminStore,
        });        
        // end case
        break;
      case MessageTypes.ADD_ITEM_TO_CHANNEL:
        // decode channel data + channel access
        const { itemCid, channelCid } =
          decodeAddItemMsgBody({ msgBody: posts[i].message.msgBody }) || {};
        // check for proper decode
        if (!itemCid || !channelCid) return
        // lookup itemCid + channelCid
        const item = await Item.findUnique({id: itemCid})
        const channel = await Channel.findUnique({id: channelCid})
        // check to see if target item + channel exist at timestamp of procesing
        if (!itemCid || !channelCid ) break;
        // Check to see if rid has access to add to channel
        const access = await ChannelRoles.findUnique({id: `${channelCid}/${posts[i].message.rid}`})
        // Check to see if role is greater than 0
        if (access?.role && access.role > 0) {
          await Adds.create({
            id: `${itemCid}/${channelCid}`,
            data: {
              messageId: messageId,
              itemId: itemCid,
              channelId: channelCid,
            }
          })
        } 
        break;
    }
  }

  /* ************************************************

                POST PROCESSING RECEIPT

  ************************************************ */

  // record every transaction that has entered the crud cycle
  txnReceipt = await Txn.findUnique({ id: event.transaction.hash });
  if (!txnReceipt) {
    await Txn.create({ id: event.transaction.hash });
    console.log(
      "processing complete. processed txn hash: ",
      event.transaction.hash
    );
  }
});
