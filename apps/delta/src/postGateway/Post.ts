import { ponder } from '@/generated'
import { MessageToProcess } from './types'
import { absBigInt } from '../utils'
import {
  decodePost,
  decodeMessage,
  decodeCreateChannel,
  decodeReferenceChannel,
  decodeEditChannelAccess,
  decodeCreatePublication,
  decodeReferencePublication,
  decodeRemoveReference,
  messageTypes,
  isSupportedMessageType,
  remove0xPrefix,
} from 'scrypt'
import {
  Address,
  slice,
  Hash,
  verifyMessage,
  recoverPublicKey,
  recoverMessageAddress,
} from 'viem'

ponder.on('PostGateway:Post', async ({ event, context }) => {
  /* ************************************************

                    DATA STRUCTURES

  ************************************************ */

  const {
    User,
    PostCounter,
    Post,
    Message,
    PublicationCounter,
    Publication,
    ChannelCounter,
    Channel,
    // Nft, -- not in protocol yet
    // Url, -- not in protocol yet
    ReferenceCounter,
    Reference,
    Txn,
  } = context.db

  /* ************************************************

                  DYNAMIC VARIABLES

  ************************************************ */

  let txnReceipt: { id: `0x${string}` } | null = null

  let userLookup: {
    id: bigint
    from: `0x${string}`
    to: `0x${string}`
    backup: `0x${string}`
    userId: bigint
  } | null = null

  let channelLookup: {
    id: bigint
    createdTimestamp: bigint
    createdBy: bigint
    uri: string
    admins: bigint[]
    members: bigint[]
  } | null = null

  let referenceCounter: {
    id: string
    counter: bigint
    lastUpdated: bigint
  } | null = null

  /* ************************************************

                      INTAKE

  ************************************************ */

  // console.log("txn input: ", event.transaction.input)

  // skips first 68 bytes which contain 4 byte function selector + 32 byte data offset + 32 byte data length
  const cleanedTxnData = slice(event.transaction.input, 68)
  // decodes post into its separate components. if decode failed, store txn hash and exit crud
  const decodedPost = decodePost({ postInput: cleanedTxnData })
  if (!decodedPost) {
    txnReceipt = await Txn.findUnique({ id: event.transaction.hash })
    if (!txnReceipt) {
      await Txn.create({ id: event.transaction.hash })
      console.log(
        'invalid post -- decode post failure. processed txn hash: ',
        event.transaction.hash,
      )
    }
    return
  }

  /* ************************************************

                    SIGNATURE CHECK

  ************************************************ */

  // get custody address from user id
  userLookup = await User.findUnique({ id: decodedPost?.userId })
  console.log('user lookup: ', userLookup)
  // exit crud if not a registered user id
  if (!userLookup) {
    txnReceipt = await Txn.findUnique({ id: event.transaction.hash })
    if (!txnReceipt) {
      await Txn.create({ id: event.transaction.hash })
      console.log(
        'invalid post -- invalid user id. processed txn hash: ',
        event.transaction.hash,
      )
    }
    return
  }
  // NOTE: update to context.client.verifyMessage to unlock support
  //       for smart accounts in addition to EOAs
  // const recoverAddressFromPostSignature = await recoverMessageAddress({
  //   message: remove0xPrefix({ bytes32Hash: decodedPost.hash }),
  //   signature: decodedPost.sig,
  // })
  // const signerIsValid = userLookup.to === recoverAddressFromPostSignature

  // if (!signerIsValid) {
  //   txnReceipt = await Txn.findUnique({ id: event.transaction.hash })
  //   if (!txnReceipt) {
  //     await Txn.create({ id: event.transaction.hash })
  //     console.log(
  //       'invalid post -- invalid sig for user. processed txn hash: ',
  //       event.transaction.hash,
  //     )
  //   }
  //   return
  // }

  /* ************************************************

                    PRE PROCESSING

  ************************************************ */

  const postCounter = await PostCounter.upsert({
    id: `${context.network.chainId}/${event.transaction.to}`,
    create: {
      counter: BigInt(1),
      lastUpdated: event.block.timestamp,
    },
    update: ({ current }) => ({
      counter: (current.counter as bigint) + BigInt(1),
      lastUpdated: event.block.timestamp,
    }),
  })

  // console.log("should the post counter be going up", postCounter.counter)

  const post = await Post.create({
    id: `${context.network.chainId}/${event.transaction.to}/${postCounter?.counter}`,
    data: {
      timestamp: event.block.timestamp,
      relayer: event.transaction.from,
      data: cleanedTxnData,
      userId: decodedPost?.userId,
      hashType: decodedPost.hashType,
      hash: decodedPost.hash,
      sigType: decodedPost?.sigType,
      sig: decodedPost?.sig,
      version: decodedPost?.version,
      expiration: decodedPost?.expiration,
      messageArray: decodedPost?.messageArray as Hash[],
    },
  })

  // console.log("am i creating the post", post)

  // identify number of messages sent in post
  const length = post.messageArray.length
  // outer level if statement. if 0 then no messages will be processed
  if (length && length != 0) {
    // initialize messageQueue
    const messageQueue: MessageToProcess[] = []
    // attempt to decode messages
    for (let i = 0; i < length; ++i) {
      // decode message into type + body
      const decodedMessage = decodeMessage({
        encodedMessage: decodedPost?.messageArray[i],
      })

      // if decode failed, proceed to next i in for loop
      if (!decodedMessage) continue
      // console.log("decoded message", decodedMessage)
      // if msgType not supported, proceed to next i in for loop
      if (!isSupportedMessageType(decodedMessage.msgType)) continue
      // console.log("decoded message", decodedMessage)
      // if decode successful, + msgType is supported, store message
      // store message
      // NOTE: message body may still be invalid, but further decoding + checks will happen in type specific logic
      messageQueue[i] = decodedMessage
      // store message
      await Message.create({
        // chain // messageGateway address // count of post being stored // index of message within Post
        // NOTE: do we potentially want a message counter as well thats separate from Post?
        //      I think not since feels helpful to have messages always live as sub unit of Posts
        // NOTE: update postGatewayChain -> event.transaction.chainId after bumping to next version ponder
        id: `${context.network.chainId}/${event.transaction.to}/${postCounter?.counter}/${i}`,
        data: {
          msgType: messageQueue[i]?.msgType,
          msgBody: messageQueue[i]?.msgBody,
        },
      })
    }

    /* ************************************************

                      MESSAGE PROCESSING

    ************************************************ */

    /*
     * MESSAGE TYPES (✅ = implemented)
     * 100 create Chan - ✅
     * 101 reference existing Chan - ✅
     * 102 edit Chan uri - []
     * 103 edit Chan admins/members - ✅
     * 200 create Pub - ✅
     * 201 reference existing Pub - ✅
     * 202 edit Pub uri - []
     * 300 create Nft - []
     * 301 reference existing Nft - []
     * 400 create Url - []
     * 401 reference existing Url - []
     * 402 edit Url - []
     * 500 remove reference - ✅ (only one type of remove since refs treated the same)
     */

    // processs messages in queue. only validly formatted messages will make it here
    for (let i = 0; i < messageQueue.length; ++i) {
      console.log('what message type: ', messageQueue[i]?.msgType)
      switch (messageQueue[i]?.msgType) {

        /**************************************************

                          CHANNEL CASES

        **************************************************/    

        /*
         * CREATE CHANNEL
         */
        case messageTypes.createChannel:
          console.log('running 100 create chan case')
          // decode msgBody into channel uri
          const decodedCreateChannel = decodeCreateChannel({
            msgBody: messageQueue[i].msgBody,
          })
          // if decode uncessful exist case
          if (!decodedCreateChannel) break
          // increment channel counter
          const channelCounter = await ChannelCounter.upsert({
            id: `${context.network.chainId}/${event.transaction.to}`,
            create: {
              counter: BigInt(1),
              lastUpdated: event.block.timestamp,
            },
            update: ({ current }) => ({
              counter: (current.counter as bigint) + BigInt(1),
              lastUpdated: event.block.timestamp,
            }),
          })
          // create channel
          await Channel.create({
            id: channelCounter?.counter as bigint,
            data: {
              createdTimestamp: event.block.timestamp,
              createdBy: decodedPost?.userId,
              uri: decodedCreateChannel.uri,
              admins: decodedCreateChannel.adminIds as bigint[],
              members: decodedCreateChannel.memberIds as bigint[],
            },
          })
          // process channel tags
          for (let i = 0; i < decodedCreateChannel.channelTags.length; ++i) {
            // check if channel exists
            const channelLookup = await Channel.findUnique({
              id: decodedCreateChannel.channelTags[i],
            })
            if (!channelLookup) continue
            // can only add references if admin/memmber of channel
            if (
              !channelLookup.admins.includes(decodedPost.userId) &&
              !channelLookup.members?.includes(decodedPost.userId)
            )
              continue
            // increment reference counter
            const referenceCounter = await ReferenceCounter.upsert({
              id: 'ReferenceCounter',
              create: {
                counter: BigInt(1),
                lastUpdated: event.block.timestamp,
              },
              update: ({ current }) => ({
                counter: (current.counter as bigint) + BigInt(1),
                lastUpdated: event.block.timestamp,
              }),
            })
            // create reference
            await Reference.create({
              id: referenceCounter?.counter as bigint,
              data: {
                createdTimestamp: event.block.timestamp,
                createdBy: decodedPost.userId,
                channelId: decodedCreateChannel.channelTags[i], // these are the channels to add the newly created refererence to to
                pubRefId: undefined, // purposely left undefined
                chanRefId: channelCounter?.counter, // this is the channel that was just created
              },
            })
          }
          break

        /*
         * REFERENCE CHANNEL
         */
        case messageTypes.referenceChannel:
          console.log('running 101 ref chan case')
          // decode msgBody into channel target + channel tags
          const decodedReferenceChannels = decodeReferenceChannel({
            msgBody: messageQueue[i].msgBody,
          })
          // if decode uncessful exist case
          if (!decodedReferenceChannels) break
          // process tags
          for (
            let i = 0;
            i < decodedReferenceChannels.channelTags.length;
            ++i
          ) {
            // check if channel exists
            channelLookup = await Channel.findUnique({
              id: decodedReferenceChannels.channelTags[i],
            })
            if (!channelLookup) continue
            // can only add reference if admin/memmber of channel
            if (
              !channelLookup.admins.includes(decodedPost.userId) &&
              !channelLookup.members?.includes(decodedPost.userId)
            )
              continue
            // increment reference counter
            referenceCounter = await ReferenceCounter.upsert({
              id: 'ReferenceCounter',
              create: {
                counter: BigInt(1),
                lastUpdated: event.block.timestamp,
              },
              update: ({ current }) => ({
                counter: (current.counter as bigint) + BigInt(1),
                lastUpdated: event.block.timestamp,
              }),
            })
            // create reference
            await Reference.create({
              id: referenceCounter?.counter as bigint,
              data: {
                createdTimestamp: event.block.timestamp,
                createdBy: decodedPost.userId,
                channelId: decodedReferenceChannels.channelTags[i],
                pubRefId: undefined, // purposely left undefined
                chanRefId: decodedReferenceChannels.channelTarget,
              },
            })
          }
          break

        /*
         * EDIT CHANNEL ACCESS
         */          
        case messageTypes.editChannelAccess:
          console.log('running 103 edit chan access case')
          // decode editchannelaccess message
          const decodedEditChannelAccess = decodeEditChannelAccess({
            msgBody: messageQueue[i].msgBody
          })
          // if decode uncessful exist case
          if (!decodedEditChannelAccess) break
          // lookup target channel
          channelLookup = await Channel.findUnique({
            id: decodedEditChannelAccess.channelTarget,
          })
          // if lookup unsuccessful exit case
          if (!channelLookup) break          
          // check if user id sender is admin of channel
          if (!channelLookup.admins.includes(decodedPost.userId)) break
          // process admin changes in for loop
          for (let i = 0; i < decodedEditChannelAccess.admins.length; ++i) {
            console.log("processing admin changes", decodedEditChannelAccess.admins[i])
            let instructions = decodedEditChannelAccess.admins[i] < 0 ? 0 : 1 // 0 = remove, 1 = add
            // lookup userid to add/remove. do absolute value check incase of remove which will be negative
            userLookup = await User.findUnique({ id: absBigInt(decodedEditChannelAccess.admins[i]) })
            // skip to next i in for loop if doesnt exist
            if (!userLookup) continue
            // logic branch for add or removal
            if (instructions === 1) {
              // skip to next i in for loop if admin already present in admin/member arrays
              if (
                channelLookup.admins.includes(decodedEditChannelAccess.admins[i])
                || channelLookup.members.includes(decodedEditChannelAccess.admins[i])
              ) continue
              // add user as admin
              await Channel.update({
                id: decodedEditChannelAccess.channelTarget,
                data: ({ current }) => ({
                  admins: [...current.admins, decodedEditChannelAccess.admins[i]]
                })
              })
            } else {
              // skip to next i in for loop if admin is not present
              if (!channelLookup.admins.includes(absBigInt(decodedEditChannelAccess.admins[i]))) continue
              // remove user as admin
              await Channel.update({
                id: decodedEditChannelAccess.channelTarget,
                data: ({ current }) => ({
                  admins: current.admins.filter(adminId => adminId !== absBigInt(decodedEditChannelAccess.admins[i]))
                })
              })
            }
          }
          // process member changes in for loop
          for (let i = 0; i < decodedEditChannelAccess.members.length; ++i) {
            console.log("processing member changes", decodedEditChannelAccess.members[i])
            let instructions = decodedEditChannelAccess.members[i] < 0 ? 0 : 1 // 0 = remove, 1 = add
            // lookup userid to add/remove. do absolute value check incase of remove which will be negative
            userLookup = await User.findUnique({ id: absBigInt(decodedEditChannelAccess.members[i]) })            
            // skip to next i in for loop if doesnt exist
            if (!userLookup) continue
            console.log("user lookup worked")
            console.log("instructions = ", instructions)
            // logic branch for add or removal
            if (instructions === 1) {
              // skip to next i in for loop if admin already present in admin/member arrays
              if (
                channelLookup.admins.includes(decodedEditChannelAccess.members[i])
                || channelLookup.members.includes(decodedEditChannelAccess.members[i])
              ) continue
              // add user as member
              await Channel.update({
                id: decodedEditChannelAccess.channelTarget,
                data: ({ current }) => ({
                  members: [...current.members, decodedEditChannelAccess.members[i]]
                })
              })
            } else {
              // skip to next i in for loop if member is not present
              if (!channelLookup.members.includes(absBigInt(decodedEditChannelAccess.members[i]))) continue
              // remove user as admin
              await Channel.update({
                id: decodedEditChannelAccess.channelTarget,
                data: ({ current }) => ({
                  members: current.members.filter(memberId => memberId !== absBigInt(decodedEditChannelAccess.members[i]))
                })
              })
            }
          }
          break

        /**************************************************

                          PUBLICATION CASES

        **************************************************/

        /*
         * CREATE PUBLICATION
         */
        case messageTypes.createPublication:
          console.log('running 200 create pub case')
          // decode msgBody into pub uri + channel tags
          const decodedCreatePublication = decodeCreatePublication({
            msgBody: messageQueue[i].msgBody,
          })
          console.log(
            'decoded create pub before break: ',
            decodedCreatePublication,
          )
          // if decode unsuccessful, exist case
          if (!decodedCreatePublication) break
          console.log('decoded the pub: ', decodedCreatePublication)
          // increment publication counter
          const publicationCounter = await PublicationCounter.upsert({
            id: `${context.network.chainId}/${event.transaction.to}`,
            create: {
              counter: BigInt(1),
              lastUpdated: event.block.timestamp,
            },
            update: ({ current }) => ({
              counter: (current.counter as bigint) + BigInt(1),
              lastUpdated: event.block.timestamp,
            }),
          })
          // create publication
          await Publication.create({
            id: publicationCounter.counter as bigint,
            data: {
              createdTimestamp: event.block.timestamp,
              createdBy: decodedPost.userId,
              uri: decodedCreatePublication.uri,
            },
          })
          // process channel tags
          for (
            let i = 0;
            i < decodedCreatePublication.channelTags.length;
            ++i
          ) {
            // check if channel exists
            channelLookup = await Channel.findUnique({
              id: decodedCreatePublication.channelTags[i],
            })
            if (!channelLookup) continue
            // can only add references if admin/memmber of channel
            if (
              !channelLookup.admins.includes(decodedPost.userId) &&
              !channelLookup.members?.includes(decodedPost.userId)
            )
              continue
            // increment reference counter
            referenceCounter = await ReferenceCounter.upsert({
              id: 'ReferenceCounter',
              create: {
                counter: BigInt(1),
                lastUpdated: event.block.timestamp,
              },
              update: ({ current }) => ({
                counter: (current.counter as bigint) + BigInt(1),
                lastUpdated: event.block.timestamp,
              }),
            })
            // create reference
            await Reference.create({
              id: referenceCounter?.counter as bigint,
              data: {
                createdTimestamp: event.block.timestamp,
                createdBy: decodedPost.userId,
                channelId: decodedCreatePublication.channelTags[i],
                pubRefId: publicationCounter?.counter as bigint,
                chanRefId: undefined, // purposely left undefined
              },
            })
          }
          break

        /*
         * REFERENCE PUBLICATION
         */
        case messageTypes.referencePublication:
          console.log('running 201 reference pub case')
          const decodedReferencePublication = decodeReferencePublication({
            msgBody: messageQueue[i].msgBody,
          })
          // if decode uncessful exist case
          if (!decodedReferencePublication) break
          // process tags
          for (
            let i = 0;
            i < decodedReferencePublication.channelTags.length;
            ++i
          ) {
            // check if channel exists
            channelLookup = await Channel.findUnique({
              id: decodedReferencePublication.channelTags[i],
            })
            if (!channelLookup) continue
            // can only add reference if admin/memmber of channel
            if (
              !channelLookup.admins.includes(decodedPost.userId) &&
              !channelLookup.members?.includes(decodedPost.userId)
            )
              continue
            // increment reference counter
            referenceCounter = await ReferenceCounter.upsert({
              id: 'ReferenceCounter',
              create: {
                counter: BigInt(1),
                lastUpdated: event.block.timestamp,
              },
              update: ({ current }) => ({
                counter: (current.counter as bigint) + BigInt(1),
                lastUpdated: event.block.timestamp,
              }),
            })
            // create reference
            await Reference.create({
              id: referenceCounter?.counter as bigint,
              data: {
                createdTimestamp: event.block.timestamp,
                createdBy: decodedPost.userId,
                channelId: decodedReferencePublication.channelTags[i],
                pubRefId: decodedReferencePublication.targetPublication,
                chanRefId: undefined, // purposely left undefined
              },
            })
          }
          break

        /**************************************************

                            REMOVE CASE

        **************************************************/

        /*
         * REMOVE REFERENCE
         */
        case messageTypes.removeReference:
          console.log('running 500 remove reference case')
          const decodedRemoveReference = decodeRemoveReference({
            msgBody: messageQueue[i].msgBody,
          })
          // if decode uncessful exist case
          if (!decodedRemoveReference) break
          // check if channel exists
          channelLookup = await Channel.findUnique({
            id: decodedRemoveReference.channelId,
          })
          if (!channelLookup) break
          // check if reference exists and is in channel
          const referenceLookup = await Reference.findUnique({
            id: decodedRemoveReference.referenceId,
          })
          if (referenceLookup?.channelId != decodedRemoveReference.channelId)
            break
          // can only remove references if you are channel admin or reference creator
          if (
            !channelLookup.admins.includes(decodedPost.userId) &&
            referenceLookup.createdBy != decodedPost.userId
          )
            break
          // update reference so that it no longer has a target channel
          // NOTE: this was updated to delete the entire reference
          //    as opposed to just clearing the value of the channel it was anchored to
          await Reference.delete({
            id: decodedRemoveReference.referenceId,
          })
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
