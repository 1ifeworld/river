import { ponder } from "@/generated";
import { postGatewayChain } from "../constants";
import { MessageToProcess } from "./types";
import {
  decodePost,
  decodeMessage,
  messageTypes,
  decodeCreateChannel,
  decodeReferenceChannel,
  decodeCreatePublication,
  decodeReferencePublication,
  decodeRemoveReference
} from "scrypt";
import { slice } from "viem";
import { Channel, ReferenceCounter } from "@/generated";

ponder.on("PostGateway:Post", async ({ event, context }) => {

  /* ************************************************

                    DATA STRUCTURES

  ************************************************ */   

  const {
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
    Txn
  } = context.entities;

  /* ************************************************

                  DYNAMIC VARIABLES

  ************************************************ */  

  let referenceCounter: ReferenceCounter | null = null
  let channelLookup: Channel | null = null

  /* ************************************************

                    PRE PROCESSING

  ************************************************ */       

  // skips first 68 bytes which contain 4 byte function selector + 32 byte data offset + 32 byte data length
  const cleanedTxnData = slice(event.transaction.input, 68);
  // decodes post into its separate components
  const decodedPost = decodePost({ postInput: cleanedTxnData });

  /*
  *   
  * PERFORM SIGNATURE CHECK HERE
  * 
  * NOTE: posts with invalid signatures will not be saved, regardless of message type
  * 
  */

  

  // identify number of messages sent in post
  const length = decodedPost?.messageArray.length;
  // outer level if statement. if 0 then no messages will be processed
  if (length && length != 0) {
    // initialize messageQueue
    const messageQueue: MessageToProcess[] = [];
    // attempt to decode messages
    for (let i = 0; i < length; ++i) {
      // decode message into type + body
      const decodedMessage = decodeMessage({ encodedMessage: decodedPost?.messageArray[i] });
      // if decode failed, move to next i in for loop
      if (!decodedMessage) continue
      /* 
      *
      * PERFORM MESSAGE TYPE VALIDATION HERE
      * 
      * INVALID MESSAGE TYPES will not be saved
      */
      // if decode successful, set decoded message inm message que
      messageQueue[i] = decodedMessage;
      //





    }

    /* ************************************************

                      MESSAGE PROCESSING

    ************************************************ */

    /*
    * MESSAGE TYPES (✅ = implemented)
    * 100 create Chan - ✅
    * 101 reference existing Chan - ✅
    * 102 edit Chan uri - []
    * 103 edit Chan admins/members - []
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
      console.log("what message type: ", messageQueue[i]?.msgType)
      switch (messageQueue[i]?.msgType) {

        /*
        * CREATE CHANNEL
        */
        case messageTypes.createChannel:
          console.log("running 100 create chan case")   
          // decode msgBody into channel uri
          const decodedCreateChannel = decodeCreateChannel({ msgBody: messageQueue[i].msgBody });
          // if decode uncessful exist case
          if (!decodedCreateChannel) break
          // increment channel counter
          const channelCounter = await ChannelCounter.upsert({
            id: `${postGatewayChain}/${event.transaction.to}`,
            create: {
              timestamp: event.block.timestamp,
              counter: BigInt(1),
            },
            update: ({ current }) => ({
              timestamp: event.block.timestamp,
              counter: (current.counter as bigint) + BigInt(1),
            }),
          });
          // create channel
          await Channel.create({
            id: channelCounter?.counter as bigint,
            data: {
              timestamp: event.block.timestamp,
              creatorId: decodedPost?.userId,
              uri: decodedCreateChannel.uri,
              admins: decodedCreateChannel.adminIds as bigint[],
              members: decodedCreateChannel.memberIds as bigint[],
            },
          }); 
          // process channel tags
          for (let i = 0; i < decodedCreateChannel.channelTags.length; ++i) {
            // check if channel exists
            const channelLookup = await Channel.findUnique({ id: decodedCreateChannel.channelTags[i] });
            if (!channelLookup) continue
            // can only add references if admin/memmber of channel
            if (            
                !channelLookup.admins.includes(decodedPost.userId)
                && !channelLookup.members?.includes(decodedPost.userId)
            ) continue
            // increment reference counter
            const referenceCounter = await ReferenceCounter.upsert({
              id: "ReferenceCounter",
              create: { counter: BigInt(1)},
              update: ({ current }) => ({
                counter: (current.counter as bigint) + BigInt(1),
              }),
            })
            // create reference
            await Reference.create({
              id: referenceCounter?.counter as bigint,
              data: {                 
                timestamp: event.block.timestamp,
                userId: decodedPost.userId,
                channel: decodedCreateChannel.channelTags[i], // these are the channels to add the newly created channel to                 
                pubRef: undefined, // purposely left undefined  
                nftRef: undefined, // purposely left undefined
                urlRef: undefined, // purposely left undefined        
                chanRef: channelCounter?.counter // this is the channel that was just created               
              }
            })
          } break   

        /*
        * REFERENCE CHANNEL
        */                              
        case messageTypes.referenceChannel:
          console.log("running 101 ref chan case")   
          // decode msgBody into channel target + channel tags
          const decodedReferenceChannels = decodeReferenceChannel({ msgBody: messageQueue[i].msgBody });
          // if decode uncessful exist case
          if (!decodedReferenceChannels) break       
          // process tags
          for (let i = 0; i < decodedReferenceChannels.channelTags.length; ++i) {
            // check if channel exists
            channelLookup = await Channel.findUnique({ id: decodedReferenceChannels.channelTags[i] });
            if (!channelLookup) continue
              // can only add reference if admin/memmber of channel
              if (            
                !channelLookup.admins.includes(decodedPost.userId)
                && !channelLookup.members?.includes(decodedPost.userId)
            ) continue                 
            // increment reference counter
            referenceCounter = await ReferenceCounter.upsert({
              id: "ReferenceCounter",
              create: { counter: BigInt(1)},
              update: ({ current }) => ({
                counter: (current.counter as bigint) + BigInt(1),
              }),
            })
            // create reference
            await Reference.create({
              id: referenceCounter?.counter as bigint,
              data: { 
                timestamp: event.block.timestamp,
                userId: decodedPost.userId,
                channel: decodedReferenceChannels.channelTags[i],                 
                pubRef: undefined, // purposely left undefined
                nftRef: undefined, // purposely left undefined
                urlRef: undefined, // purposely left undefined
                chanRef: decodedReferenceChannels.channelTarget
              }
            });
          } break

        /* ************************************************

                          PUBLICATION CASES

        ************************************************ */           

        /*
        * CREATE PUBLICATION
        */                                
        case messageTypes.createPublication:  
          console.log("running 200 create pub case")   
          // decode msgBody into pub uri + channel tags
          const decodedCreatePublication = decodeCreatePublication({ msgBody: messageQueue[i].msgBody });
          // if decode unsuccessful, exist case
          if (!decodedCreatePublication) break
          // increment publication counter
          const publicationCounter = await PublicationCounter.upsert({
            id: `${postGatewayChain}/${event.transaction.to}`,
            create: {
              timestamp: event.block.timestamp,
              counter: BigInt(1),
            },
            update: ({ current }) => ({
              timestamp: event.block.timestamp,
              counter: (current.counter as bigint) + BigInt(1),
            }),
          });
          // create publication
          await Publication.create({
            id: publicationCounter.counter as bigint,
            data: {
              timestamp: event.block.timestamp,
              creatorId: decodedPost?.userId,
              uri: decodedCreatePublication.uri,
            },
          });        
          // process channel tags
          for (let i = 0; i < decodedCreatePublication.channelTags.length; ++i) {
            // check if channel exists
            channelLookup = await Channel.findUnique({ id: decodedCreatePublication.channelTags[i] });
            if (!channelLookup) continue
            // can only add references if admin/memmber of channel
            if (            
                !channelLookup.admins.includes(decodedPost.userId)
                && !channelLookup.members?.includes(decodedPost.userId)
            ) continue
            // increment reference counter
            referenceCounter = await ReferenceCounter.upsert({
              id: "ReferenceCounter",
              create: { counter: BigInt(1)},
              update: ({ current }) => ({
                counter: (current.counter as bigint) + BigInt(1),
              }),
            })
            // create reference
            await Reference.create({
              id: referenceCounter?.counter as bigint,
              data: { 
                timestamp: event.block.timestamp,
                userId: decodedPost.userId,
                channel: decodedCreatePublication.channelTags[i],                
                pubRef: publicationCounter?.counter as bigint,
                nftRef: undefined, // purposely left undefined
                urlRef: undefined, // purposely left undefined
                chanRef: undefined // purposely left undefined                
              }
            })
          } break
          
        /*
        * REFERENCE PUBLICATION
        */               
        case messageTypes.referencePublication:
          console.log("running 201 reference pub case")          
          const decodedReferencePublication = decodeReferencePublication({ msgBody: messageQueue[i].msgBody })
          // if decode uncessful exist case
          if (!decodedReferencePublication) break      
          // process tags
          for (let i = 0; i < decodedReferencePublication.channelTags.length; ++i) {            
            // check if channel exists
            channelLookup = await Channel.findUnique({ id: decodedReferencePublication.channelTags[i] });
            if (!channelLookup) continue
            // can only add reference if admin/memmber of channel
            if (            
                !channelLookup.admins.includes(decodedPost.userId)
                && !channelLookup.members?.includes(decodedPost.userId)
            ) continue
            // increment reference counter
            referenceCounter = await ReferenceCounter.upsert({
              id: "ReferenceCounter",
              create: { counter: BigInt(1)},
              update: ({ current }) => ({
                counter: (current.counter as bigint) + BigInt(1),
              }),
            })
            // create reference
            await Reference.create({
              id: referenceCounter?.counter as bigint,
              data: { 
                timestamp: event.block.timestamp,
                userId: decodedPost.userId,
                channel: decodedReferencePublication.channelTags[i],               
                pubRef: decodedReferencePublication.targetPublication,
                nftRef: undefined, // purposely left undefined
                urlRef: undefined, // purposely left undefined
                chanRef: undefined // purposely left undefined
              }
            });
          } break          

        /* ************************************************

                            REMOVE CASE

        ************************************************ */           

        /*
        * REMOVE REFERENCE
        */                                 
        case messageTypes.removeReference:
          console.log("running 500 remove reference case")
          const decodedRemoveReference = decodeRemoveReference({msgBody: messageQueue[i].msgBody})
          // if decode uncessful exist case
          if (!decodedRemoveReference) break    
          // check if channel exists
          channelLookup = await Channel.findUnique({ id: decodedRemoveReference.channelId });
          if (!channelLookup) break       
          // check if reference exists and is in channel
          const referenceLookup = await Reference.findUnique({ id: decodedRemoveReference.referenceId });
          if (referenceLookup?.channel != decodedRemoveReference.channelId) break             
          // can only remove references if you are channel admin or reference creator
          if (            
            !channelLookup.admins.includes(decodedPost.userId)
            && referenceLookup.userId != decodedPost.userId
          ) break  
          // update reference so that it no longer has a target channel
          // NOTE: might want to decide to delete the entire reference. not sure yet
          await Reference.update({
            id: decodedRemoveReference.referenceId,
            data: {
              channel: undefined
            }
          }); break              
      }
    }
  }

  /* ************************************************

                POST PROCESSING RECEIPT

  ************************************************ */       

  // record every transaction that has entered the crud cycle
  const txnHashProcessedCheck = await Txn.findUnique({
    // id: event.block.hash
    id: event.transaction.hash,
  });
  if (!txnHashProcessedCheck) {
    await Txn.create({
      id: event.transaction.hash,
    });
    console.log("processed txn hash: ", event.transaction.hash);
  }
});