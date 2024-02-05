import { ponder } from "@/generated";
import {
  postGateway2ABI,
  decodeCreateAssetMsgBody,
  decodeAddItemMsgBody,
  remove0xPrefix,
  Post,
  MessageTypes,
  ChannelAccessTypes,
  ChannelDataTypes,
  ItemAccessTypes,
  ItemDataTypes
} from "scrypt";
import {
  Hash,
  Hex,
  decodeFunctionData,
  getAddress,
  decodeAbiParameters,
  recoverMessageAddress,
} from "viem";
import { messageToCid, postToCid } from "../utils";

ponder.on("PostGateway:NewPost", async ({ event, context }) => {
  /* ************************************************

                    DATA STRUCTURES

  ************************************************ */

  const {
    Txn,
    User,
    Post,
    Message,
    Channel,
    ChannelRoles,
    Item,
    ItemRoles,
    Adds,
  } = context.db;

  /* ************************************************

                  DYNAMIC VARIABLES

  ************************************************ */

  let txnReceipt: { id: `0x${string}` } | null = null;

  /* ************************************************

                      INTAKE

  ************************************************ */

    // @ts-ignore
    BigInt.prototype.toJSON = function () {
      return this.toString()
    }                         

  let posts: Post[] = [];

  const { args } = decodeFunctionData({
    abi: postGateway2ABI,
    data: event.transaction.input,
  });

  console.log("args coming in correcltly? ", args);

  // if decode fails return
  if (!args?.[0]) return;

  // Check if args is an array of posts or a batch of posts
  if (Array.isArray(args[0])) {
    console.log("is array");
    // const batchPost = args[0] as Post[];
    for (let i = 0; i < args[0].length; ++i) {
      // console.log("post #", i + 1)
      // console.log(batchPost[i])
      posts[i] = args[0][i];
      // console.log("args[0][i]", args[0][i]);
      // let postBlock = await createBlockFromAnything(posts[i]);
      // console.log(`post block ${i}`, (await createBlockFromAnything(posts[i])).cid.toString())
    }
    // batchPost.forEach((post) => {
    //   console.log(post)
    //   posts.push(post);
    // });
  } else {
    console.log("not array");
    const singlePost = args[0] as Post;
    // console.log("single post: ", singlePost)
    posts.push(singlePost);
  }

  // process every post -> associated message
  for (let i = 0; i < posts.length; ++i) {
    // check for message validity
    // check if timestamp is greater than 10 mins in the future of the block it was emitted din
    // NOTE: can potentially make this way lower in our blockchain era?
    if (posts[i].message.timestamp > event.block.timestamp + BigInt(600))
      return;

    // get custody address from user id
    const userLookup = await User.findUnique({ id: posts[i].message.rid });

    if (!userLookup) return;

    const recoverAddressFromMessageSignature = await recoverMessageAddress({
      message: remove0xPrefix({ bytes32Hash: posts[i].hash }),
      signature: posts[i].sig,
    });

    const signerIsValid =
      getAddress(userLookup.to) === recoverAddressFromMessageSignature;

    if (!signerIsValid) return;

    console.log("signature is valid here");

    // Create blocks for things
    const postId = (await postToCid(posts[i])).cid.toString()
    // Create message id which will be saved in asset create events

    console.log("incoming message: ", posts[i].message)

    const messageId = (await messageToCid(posts[i].message)).cid.toString()

    console.log("messageId: ", messageId)

    // store post + message
    const storedPost = await Post.upsert({
      id: postId,
      create: {
        // parentBlock: encodedPostBlockBytes,
        relayer: event.transaction.from,
        signer: posts[i].signer,
        messageId: messageId,
        hashType: BigInt(posts[i].hashType),
        hash: posts[i].hash,
        sigType: BigInt(posts[i].sigType),
        sig: posts[i].sig,
      },
      update: {},
    });

    const storedMessage = await Message.upsert({
      id: messageId,
      create: {
        rid: posts[i].message.rid,
        timestamp: posts[i].message.timestamp,
        msgType: BigInt(posts[i].message.msgType),
        msgBody: posts[i].message.msgBody,
      },
      update: {},
    });

    switch (posts[i].message.msgType) {
      case MessageTypes.CREATE_CHANNEL:
        // decode channel data + channel access
        const { data: channelData, access: channelAccess } =
          decodeCreateAssetMsgBody({ msgBody: posts[i].message.msgBody }) || {};
        // check to see if data type + access type are valid
        if (channelData?.dataType != ChannelDataTypes.NAME_AND_DESC) break;
        if (channelAccess?.accessType != ChannelAccessTypes.ROLES) break;
        // decode base64EncodedBytesUrl from data.contents  (if ChannelDataTypes.STRING_URI)
        const [name, description] = decodeAbiParameters(
          [
            { name: "name", type: "string" },
            { name: "desc", type: "string" },
          ],
          channelData.contents
        );
        // decode admins + members from access.contents (if ChannelAccessTypes.Roles)
        const [channelAdmins, channelMembers] = decodeAbiParameters(
          [
            { name: "channelAdmins", type: "uint256[]" },
            { name: "channelMembers", type: "uint256[]" },
          ],
          channelAccess.contents
        );
        // Create channel
        await Channel.upsert({
          id: messageId,
          create: {
            messageId: messageId,
            timestamp: posts[i].message.timestamp,
            createdBy: posts[i].message.rid,
            uri: channelData.contents,
            name: name,
            description: description,
          },
          update: {},
        });
        // Store channel roles (ChannelAccessTypes.ROLES)
        let channelRolesStore: {
          id: string;
          timestamp: bigint;
          channelId: string;
          rid: bigint;
          role: bigint;
        }[] = [];
        // build channelRolesStore for createMany
        for (let i = 0; i < channelAdmins.length; ++i) {
          channelRolesStore.push({
            id: `${messageId}/${channelAdmins[i]}`,
            timestamp: posts[i].message.timestamp,
            channelId: messageId,
            rid: channelAdmins[i],
            role: BigInt(2),
          });
        }
        for (let i = 0; i < channelMembers.length; ++i) {
          channelRolesStore.push({
            id: `${messageId}/${channelMembers[i]}`,
            timestamp: posts[i].message.timestamp,
            channelId: messageId,
            rid: channelMembers[i],
            role: BigInt(1),
          });
        }
        // set roles
        for (let i = 0; i < channelRolesStore.length; ++i) {
          await ChannelRoles.upsert({
            id: `${messageId}/${channelRolesStore[i].rid}`,
            create: {
              timestamp: posts[i].message.timestamp,
              channelId: messageId,
              rid: channelRolesStore[i].rid,
              role: channelRolesStore[i].role,
            },
            update: {},
          });
        }
        // Set roles
        // await ChannelRoles.createMany({
        //   data: channelRolesStore,
        // });
        // end case
        break;
      case MessageTypes.CREATE_ITEM:
        console.log("running create item");
        // Create itemId from original message. itemId = cid(Message(rid, timestamp, msgType, msgBody))
        // decode channel data + channel access
        const { data: itemData, access: itemAccess } =
          decodeCreateAssetMsgBody({ msgBody: posts[i].message.msgBody }) || {};
        // check to see if data type + access type are valid
        if (itemData?.dataType != ItemDataTypes.STRING_URI) break;
        if (itemAccess?.accessType != ItemAccessTypes.ROLES) break;
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
        await Item.upsert({
          id: messageId,
          create: {
            messageId: messageId,
            timestamp: posts[i].message.timestamp,
            createdby: posts[i].message.rid,
            uri: itemUri,
          },
          update: {},
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
            id: `${messageId}/${itemAdmins[i]}`,
            itemId: messageId,
            rid: itemAdmins[i],
            role: BigInt(2),
          });
        }
        // set roles
        for (let i = 0; i < itemAdminStore.length; ++i) {
          await ItemRoles.upsert({
            id: `${messageId}/${itemAdminStore[i].rid}`,
            create: {
              itemId: messageId,
              rid: itemAdminStore[i].rid,
              role: itemAdminStore[i].role,
            },
            update: {},
          });
        }
        // end case
        break;
      case MessageTypes.ADD_ITEM_TO_CHANNEL:
        console.log("running add item to channel");
        // decode channel data + channel access
        const { itemCid, channelCid } =
          decodeAddItemMsgBody({ msgBody: posts[i].message.msgBody }) || {};
        // const [itemCidString] = decodeAbiParameters
        // check for proper decode
        if (!itemCid || !channelCid) return;
        // lookup itemCid + channelCid
        const item = await Item.findUnique({ id: itemCid });
        const channel = await Channel.findUnique({ id: channelCid });
        // check to see if target item + channel exist at timestamp of procesing
        if (!itemCid || !channelCid) break;
        console.log("item cid: ", itemCid);
        console.log("channelCid cid: ", channelCid);
        // Check to see if rid has access to add to channel
        const access = await ChannelRoles.findUnique({
          id: `${channelCid}/${posts[i].message.rid}`,
        });
        console.log("has access! lets add it", access);
        // Check to see if role is greater than 0
        if (access?.role && access.role > 0) {
          // check if item exists. prevent adding item cids that dont exist
          const itemLookup = await Item.findUnique({ id: itemCid });
          console.log("item lookup: ", itemLookup)
          if (!itemLookup) break;
          console.log("made it to end");
          await Adds.upsert({
            id: `${channelCid}/${itemCid}`,
            create: {
              timestamp: posts[i].message.timestamp,
              addedBy: posts[i].message.rid,
              messageId: messageId,
              itemId: itemCid,
              channelId: channelCid,
            },
            update: {},
          });
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
