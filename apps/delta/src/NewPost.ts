import { ponder } from '@/generated'
import {
  postGatewayABI,
  decodeCreateAssetMsgBody,
  decodeAddItemMsgBody,
  remove0xPrefix,
  type Post,
  MessageTypes,
  ChannelAccessTypes,
  ChannelDataTypes,
  ItemAccessTypes,
  ItemDataTypes,
  ChannelRoleTypes,
  decodeRemoveItemMsgBody,
  decodeUpdateAssetMsgBody,
} from 'scrypt'
import {
  decodeFunctionData,
  getAddress,
  decodeAbiParameters,
  recoverMessageAddress,
  Hex,
} from 'viem'
import { messageToCid, postToCid, USER_ID_ZERO } from './utils'

ponder.on('PostGateway:NewPost', async ({ event, context }) => {
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
    ChannelCounter,
    Item,
    ItemRoles,
    ItemCounter,
    Adds,
  } = context.db

  /* ************************************************

                  DYNAMIC VARIABLES

  ************************************************ */

  let txnReceipt: { id: `0x${string}` } | null = null

  /* ************************************************

                      INTAKE

  ************************************************ */

  const posts: Post[] = []

  const { args, functionName } = decodeFunctionData({
    abi: postGatewayABI,
    data: event.transaction.input,
  })

  // if decode fails return
  if (!args?.[0]) return

  if (functionName === 'post') posts[0] = args[0]
  if (functionName === 'postBatch') {
    for (let i = 0; i < args[0].length; ++i) {
      posts[i] = args[0][i]
    }
  }

  console.log("posts to process: ", posts)

  // process every post -> associated message
  for (let i = 0; i < posts.length; ++i) {
    // check for message validity
    // if timestamp is greater than 10 mins in the future of the block it was emitted in
    if (posts[i].message.timestamp > event.block.timestamp + BigInt(600)) return
    // get custody address from user id
    const userLookup = await User.findUnique({ id: posts[i].message.rid })
    // return if user lookup unsuccessful
    if (!userLookup) return
    // recover signer address from message sig
    const recoverAddressFromMessageSignature = await recoverMessageAddress({
      message: remove0xPrefix({ bytes32Hash: posts[i].hash }),
      signature: posts[i].sig,
    })
    // check if valid signer for message
    const signerIsValid =
      getAddress(userLookup.to) === recoverAddressFromMessageSignature
    // return if signer was not  valid
    if (!signerIsValid) return
    // Create post + message cid
    // NOTE: message cid will double as asset cid for CREATE_ITEM + CREATE_CHANNEL calls
    const postId = (await postToCid(posts[i])).cid.toString()
    const messageId = (await messageToCid(posts[i].message)).cid.toString()

    // ignore duplicate posts 
    // NOTE: unclear why this posts are duplicated. issue on incoming funnnel
    const postLookup = await Post.findUnique({id: postId})
    if (postLookup) {
      console.log("END: this post has already been processed")
      return
    }

    // Store Post + Message
    await Post.create({
      id: postId,
      data: {
        relayer: event.transaction.from,
        signer: posts[i].signer,
        messageId: messageId,
        hashType: BigInt(posts[i].hashType),
        hash: posts[i].hash,
        sigType: BigInt(posts[i].sigType),
        sig: posts[i].sig,
      },
    })

    await Message.upsert({
      id: messageId,
      create: {
        parentPostId: postId,
        rid: posts[i].message.rid,
        timestamp: posts[i].message.timestamp,
        msgType: BigInt(posts[i].message.msgType),
        msgBody: posts[i].message.msgBody,
      },
      update: {},
    })

    /* ************************************************

                  MESSAGING PROCESSING

  ************************************************ */

    switch (posts[i].message.msgType) {
      case MessageTypes.CREATE_ITEM: {
        // 1
        console.log('running create item')
        // decode channel data + channel access
        const { data: itemData, access: itemAccess } =
          decodeCreateAssetMsgBody({ msgBody: posts[i].message.msgBody }) || {}
        // check to see if data type + access type are valid
        if (itemData?.dataType !== ItemDataTypes.STRING_URI) break
        if (itemAccess?.accessType !== ItemAccessTypes.ROLES) break
        // decode item ipfs uri from itemData.conetnts
        const [itemUri] = decodeAbiParameters(
          [{ name: 'itemIpfsCid', type: 'string' }],
          itemData.contents,
        )
        // decode admins + from access.contents (if ItemAccessTypes.ROLES)
        const [itemMembers, itemRoles] = decodeAbiParameters(
          [
            { name: 'members', type: 'uint256[]' },
            { name: 'roles', type: 'uint256[]' },
          ],
          itemAccess.contents,
        )
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
        })
        // Store item roles (ItemAccessTypes.ROLES)
        // set roles
        for (let j = 0; j < itemMembers.length; ++j) {
          await ItemRoles.upsert({
            id: `${messageId}/${itemMembers[j]}`,
            create: {
              itemId: messageId,
              rid: itemMembers[j],
              role: itemRoles[j],
            },
            update: {},
          })
        }
        // update item counter
        await ItemCounter.upsert({
          id: `${context.network.chainId}/${event.transaction.to}/item`,
          create: {
            counter: BigInt(1),
            lastUpdated: event.block.timestamp,
          },
          update: ({ current }) => ({
            counter: (current.counter as bigint) + BigInt(1),
            lastUpdated: event.block.timestamp,
          }),
        })
        break
      }
      case MessageTypes.CREATE_CHANNEL: {
        // 3
        console.log('running create channel')
        // decode channel data + channel access
        const { data: channelData, access: channelAccess } =
          decodeCreateAssetMsgBody({ msgBody: posts[i].message.msgBody }) || {}
        // check to see if data type + access type are valid
        if (channelData?.dataType !== ChannelDataTypes.NAME_AND_DESC) break
        if (channelAccess?.accessType !== ChannelAccessTypes.ROLES) break
        const [name, description] = decodeAbiParameters(
          [
            { name: 'name', type: 'string' },
            { name: 'desc', type: 'string' },
          ],
          channelData.contents,
        )
        // decode admins + members from access.contents (if ChannelAccessTypes.Roles)
        const [members, roles] = decodeAbiParameters(
          [
            { name: 'members', type: 'uint256[]' },
            { name: 'roles', type: 'uint256[]' },
          ],
          channelAccess.contents,
        )
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
            addsCounter: BigInt(0)
          },
          update: {},
        })
        // set roles
        for (let j = 0; j < members.length; ++j) {
          // Check that corresponding role is valid (NONE or MEMBER or ADMIN)
          if (!Object.values(ChannelRoleTypes).includes(Number(roles[j])))
            continue
          // Check to make sure user exists or is USER_ID_ZERO
          const user = await User.findUnique({ id: members[j] })
          // Check if user exists
          if (!user) {
            // Check if rid is USER_ID_ZERO
            if (members[j] !== USER_ID_ZERO) continue
            // USER_ID_ZERO cannot have ADMIN role
            if (roles[j] === BigInt(ChannelRoleTypes.ADMIN)) continue
          }
          await ChannelRoles.upsert({
            id: `${messageId}/${members[j]}`,
            create: {
              timestamp: posts[i].message.timestamp,
              channelId: messageId,
              rid: members[j],
              role: roles[j],
            },
            update: {},
          })
        }
        // update channel counter
        await ChannelCounter.upsert({
          id: `${context.network.chainId}/${event.transaction.to}/channel`,
          create: {
            counter: BigInt(1),
            lastUpdated: event.block.timestamp,
          },
          update: ({ current }) => ({
            counter: (current.counter as bigint) + BigInt(1),
            lastUpdated: event.block.timestamp,
          }),
        })
        break
      }
      case MessageTypes.UPDATE_CHANNEL: {
        // 4 (230213 protocol update, update access msgs are supported)
        console.log('running update channel')
        /* currently ignoring things related to updating channel data */
        // decode channel data + channel access
        const {
          assetCid: updateChannelCid,
          data: updateChannelData,
          access: updateChannelAccess,
        } = decodeUpdateAssetMsgBody({ msgBody: posts[i].message.msgBody }) ||
        {}
        /* 
          as of the initial upgrade that enables update channel messages that took place blocktimestamp { },
          the only functionality that is possible is updating the Role based access for a channel.
          any information sent in the channel.data field will be ignored
        */
        // check to see if channelCid was passed in
        // NOTE: consider whether to only allow messages to active channel cids (channel lookup first)
        //     DECISION: don't need to do lookup, because later on we lookup roles, which will null
        //               any messages sent to channels that have no access set (or don't exist)
        //     PROTOCOL speak: you can only update roles in ROLE based access for channels that
        //                     you have a role of > 1 on. 2 is currently in use as the ADMIN role
        if (!updateChannelCid) break // this is in here for type safety, not protocol check
        // check to see if access type is valid
        // PROTOCOL: as of blocktimestamp { }, the only valid value is 1 (ROLES)
        if (updateChannelAccess?.accessType !== ChannelAccessTypes.ROLES) break
        // decode members + roles from access.contents (if ChannelAccessTypes.Roles)
        // PROTOCOL: as of blocktimestamp { }, ROLE type access contents must be decoded into a members + roles uint256[] arrays
        const [updateMembers, updateRoles] = decodeAbiParameters(
          [
            { name: 'members', type: 'uint256[]' },
            { name: 'roles', type: 'uint256[]' },
          ],
          updateChannelAccess.contents,
        )
        // lookup access control for this channel
        const roleAccess = await ChannelRoles.findUnique({
          id: `${updateChannelCid}/${posts[i].message.rid}`,
        })
        // check if rid has admin access for this channel
        if (
          roleAccess?.role &&
          roleAccess.role === BigInt(ChannelRoleTypes.ADMIN)
        ) {
          // if (roleAccess?.role && roleAccess.role > BigInt(1)) {
          console.log('rid has admin access to update role')
          if (updateMembers.length !== updateRoles.length) break // this prevents indexing breaks due to invalid array index access
          for (let j = 0; j < updateMembers.length; ++j) {
            // Check that corresponding role is valid (NONE or MEMBER or ADMIN)
            if (
              !Object.values(ChannelRoleTypes).includes(Number(updateRoles[j]))
            )
              continue
            // Check to make sure user exists or is USER_ID_ZERO
            const user = await User.findUnique({ id: updateMembers[j] })
            // Check if user exists
            if (!user) {
              // Check if rid is USER_ID_ZERO
              if (updateMembers[j] !== USER_ID_ZERO) continue
              // USER_ID_ZERO cannot have ADMIN role
              if (updateRoles[j] === BigInt(ChannelRoleTypes.ADMIN)) continue
            }
            // SET ROLES
            await ChannelRoles.upsert({
              id: `${updateChannelCid}/${updateMembers[j]}`,
              create: {
                timestamp: posts[i].message.timestamp,
                channelId: updateChannelCid,
                rid: updateMembers[j],
                role: updateRoles[j],
              },
              update: {
                timestamp: posts[i].message.timestamp,
                channelId: updateChannelCid,
                rid: updateMembers[j],
                role: updateRoles[j],
              },
            })
          }
        }
        break
      }
      case MessageTypes.ADD_ITEM_TO_CHANNEL: {
        // 5        
        const { itemCid: addItemCid, channelCid: addChannelCid } =
          decodeAddItemMsgBody({ msgBody: posts[i].message.msgBody }) || {}
          console.log(`running add item to channel for add id: ${addChannelCid}/${addItemCid} `)
        // check for proper decode
        if (!addItemCid || !addChannelCid) return
        // lookup itemCid + channelCid
        const addItem = await Item.findUnique({ id: addItemCid })
        const addChannel = await Channel.findUnique({ id: addChannelCid })
        // check to see if target item + channel exist at timestamp of processing
        if (!addItem || !addChannel) break
        // Check to see if rid has access to add to channel
        // Fetch the access data for given rid for given channel
        const access = await ChannelRoles.findUnique({
          id: `${addChannelCid}/${posts[i].message.rid}`,
        })
        // Fetch the access data for USER_ID_ZERO for given  channel
        const publicAccess = await ChannelRoles.findUnique({
          id: `${addChannelCid}/${USER_ID_ZERO}`,
        })
        // Check to see if specific userId role OR userId 0, is greater than 0
        if (
          (access?.role && access.role > BigInt(ChannelRoleTypes.NONE)) ||
          (publicAccess?.role &&
            publicAccess.role === BigInt(ChannelRoleTypes.MEMBER))
        ) {
          // check if item exists. prevent adding item cids that don't exist
          const itemLookup = await Item.findUnique({ id: addItemCid })
          if (!itemLookup) break
          // Create add           
          const addLookup = await Adds.findUnique({
            id: `${addChannelCid}/${addItemCid}`,
          })
            if (addLookup) {
            console.log("END: item already exists in channel")
            break
          }
          //
          // increment channel add counrer
          const channelAddsCounter = await Channel.update({
            id: addChannelCid,
            data: ({ current }) => ({
              addsCounter: (current.addsCounter as bigint) + BigInt(1)
            }),
          })          
          await Adds.create({
            id: `${addChannelCid}/${addItemCid}`,
            data: {
              timestamp: posts[i].message.timestamp,
              addedById: posts[i].message.rid,
              messageId: messageId,
              itemId: addItemCid,
              channelId: addChannelCid,
              channelIndex: channelAddsCounter.addsCounter
            },
          })
        }
        break
      }
      case MessageTypes.REMOVE_ITEM_FROM_CHANNEL: {
        // 6
        console.log('running remove item')
        const { itemCid: remItemCid, channelCid: remChannelCid } =
          decodeRemoveItemMsgBody({ msgBody: posts[i].message.msgBody }) || {}
        //
        const addLookup = await Adds.findUnique({
          id: `${remChannelCid}/${remItemCid}`,
        })
        // const addLookup2 = await Adds.findMany({ where: { 
        //   channelId: remChannelCid,
        //   itemId: remItemCid
        // }})
        // check for proper decode
        if (!remItemCid || !remChannelCid || !addLookup) return
        // lookup itemCid + channelCid
        const remChannel = await Channel.findUnique({ id: remChannelCid })
        // check to see if target item + channel exist at timestamp of processing
        if (!remChannel || !addLookup) break
        // Check to see if rid has access to remove from channel
        const remAccess = await ChannelRoles.findUnique({
          id: `${remChannelCid}/${posts[i].message.rid}`,
        })
        // Check to see if rid has admin role or was original adder
        if (
          (remAccess?.role &&
            remAccess.role === BigInt(ChannelRoleTypes.ADMIN)) || // is admin
          addLookup.addedById === posts[i].message.rid // was original adder
        ) {
          await Adds.update({
            id: `${remChannelCid}/${remItemCid}`,
            data: {
              removed: true,
              removedById: posts[i].message.rid,
            },
          })
        }
        break
      }
    }
  }

  /* ************************************************

                POST PROCESSING RECEIPT

  ************************************************ */

  // record every transaction that has entered the crud cycle
  txnReceipt = await Txn.findUnique({ id: event.transaction.hash })
  if (!txnReceipt) {
    await Txn.create({ id: event.transaction.hash })
    console.log(
      'processing complete. processed txn hash: ',
      event.transaction.hash,
    )
  }
})
