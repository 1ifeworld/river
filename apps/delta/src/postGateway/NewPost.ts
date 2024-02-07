import { ponder } from "@/generated";
import {
  postGatewayABI,
  decodeCreateAssetMsgBody,
  decodeAddItemMsgBody,
  remove0xPrefix,
  Post,
  MessageTypes,
  ChannelAccessTypes,
  ChannelDataTypes,
  ItemAccessTypes,
  ItemDataTypes,
  decodeRemoveItemMsgBody
} from "scrypt";
import {
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


  let posts: Post[] = [];

  const { args } = decodeFunctionData({
    abi: postGatewayABI,
    data: event.transaction.input,
  });

  console.log("args coming in correcltly? ", args);

  // if decode fails return
  if (!args?.[0]) return;

  // Check if args is an array of posts or a batch of posts
  if (Array.isArray(args[0])) {
    for (let i = 0; i < args[0].length; ++i) {
      posts[i] = args[0][i];
    }
  } else {
    const singlePost = args[0] as Post;
    posts.push(singlePost);
  }

  // process every post -> associated message
  for (let i = 0; i < posts.length; ++i) {
    // check for message validity
    // check if timestamp is greater than 10 mins in the future of the block it was emitted in
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


    // Create post + message cid
    // NOTE: message cid will double as asset cid for CREATE_ITEM + CREATE_CHANNEL calls
    const postId = (await postToCid(posts[i])).cid.toString()
    const messageId = (await messageToCid(posts[i].message)).cid.toString()

    // store post + message
    const storedPost = await Post.upsert({
      id: postId,
      create: {
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
        const [name, description] = decodeAbiParameters(
          [
            { name: "name", type: "string" },
            { name: "desc", type: "string" },
          ],
          channelData.contents
        );
        // decode admins + members from access.contents (if ChannelAccessTypes.Roles)
        const [members, roles] = decodeAbiParameters(
          [
            { name: "members", type: "uint256[]" },
            { name: "roles", type: "uint256[]" },
          ],
          channelAccess.contents
        );
        // Create channel
        await Channel.upsert({
          id: messageId,
          create: {
            messageId: messageId,
            timestamp: posts[i].message.timestamp,
            createdById: posts[i].message.rid,
            uri: channelData.contents,
            name: name,
            description: description,
          },
          update: {},
        });
        // set roles
        for (let i = 0; i < members.length; ++i) {
          await ChannelRoles.upsert({
            id: `${messageId}/${members[i]}`,
            create: {
              timestamp: posts[i].message.timestamp,
              channelId: messageId,
              rid: members[i],
              role: roles[i],
            },
            update: {},
          });
        }
        break;
      case MessageTypes.CREATE_ITEM:
        console.log("running create item");
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
        // decode admins + from access.contents (if ItemAccessTypes.ROLES)
        const [itemMembers, itemRoles] = decodeAbiParameters(
          [
            { name: "members", type: "uint256[]" },
            { name: "roles", type: "uint256[]" }
          ],
          itemAccess.contents
        );
        // Create item
        await Item.upsert({
          id: messageId,
          create: {
            messageId: messageId,
            timestamp: posts[i].message.timestamp,
            createdById: posts[i].message.rid,
            uri: itemUri,
          },
          update: {},
        });
        // Store item roles (ItemAccessTypes.ROLES)
        // set roles
        for (let i = 0; i < itemMembers.length; ++i) {
          await ItemRoles.upsert({
            id: `${messageId}/${itemMembers[i]}`,
            create: {
              itemId: messageId,
              rid: itemMembers[i],
              role: itemRoles[i],
            },
            update: {},
          });
        }
        break;
      case MessageTypes.ADD_ITEM_TO_CHANNEL:
        const { itemCid: addItemCid, channelCid: addChannelCid } =
          decodeAddItemMsgBody({ msgBody: posts[i].message.msgBody }) || {};
        // check for proper decode
        if (!addItemCid || !addChannelCid) return;
        // lookup itemCid + channelCid
        const addItem = await Item.findUnique({ id: addItemCid });
        const addChannel = await Channel.findUnique({ id: addChannelCid });
        // check to see if target item + channel exist at timestamp of procesing
        if (!addItem || !addChannel) break;
        // Check to see if rid has access to add to channel
        const access = await ChannelRoles.findUnique({
          id: `${addChannelCid}/${posts[i].message.rid}`,
        });
        // Check to see if role is greater than 0
        if (access?.role && access.role > 0) {
          // check if item exists. prevent adding item cids that dont exist
          const itemLookup = await Item.findUnique({ id: addItemCid });
          if (!itemLookup) break;
          console.log("made it to end");
          await Adds.upsert({
            id: `${addChannelCid}/${addItemCid}`,
            create: {
              timestamp: posts[i].message.timestamp,
              addedById: posts[i].message.rid,
              messageId: messageId,
              itemId: addItemCid,
              channelId: addChannelCid,
            },
            update: {},
          });
        }
        break;
        case MessageTypes.REMOVE_ITEM_FROM_CHANNEL:
          console.log("running remove item")
          const { itemCid: remItemCid, channelCid: remChannelCid } =
            decodeRemoveItemMsgBody({ msgBody: posts[i].message.msgBody }) || {};
            //
            const addLookup = await Adds.findUnique({ id: `${remChannelCid}/${remItemCid}` });
          // check for proper decode
          if (!remItemCid || !remChannelCid || !addLookup) return;
          // lookup itemCid + channelCid
          const remChannel = await Channel.findUnique({ id: remChannelCid });
          // check to see if target item + channel exist at timestamp of procesing
          if (!remChannel || !addLookup) break;
          // Check to see if rid has access to remove from channel
          const remAccess = await ChannelRoles.findUnique({
            id: `${remChannelCid}/${posts[i].message.rid}`,
          });
          console.log("channel access: ", remAccess)
          // Check to see if rid has admin role or was original adder
          if (
            remAccess?.role && remAccess.role > 1 // greater than member            
            || addLookup.addedById == posts[i].message.rid // was original adder
          ) {
            console.log("made it to end of remove");
            await Adds.update({
              id: `${remChannelCid}/${remItemCid}`,
              data: {
                removed: true,
                removedById: posts[i].message.rid
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
