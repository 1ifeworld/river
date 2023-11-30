import { ponder } from "@/generated";
import { nodeRegistryChain } from "../constants";
import {
  decodePost,
  decodeMessage,
  decodeItem,
  decodeUri,
  decodeAccess,
  decodeUriAndAccess,
} from "scrypt";
import { Hash, slice } from "viem";

ponder.on("PostGateway:Post", async ({ event, context }) => {
  const {
    PostCounter,
    Post,
    Message,
    PublicationCounter,
    Publication,
    ChannelCounter,
    Channel,
    ItemCounter,
    Item,
  } = context.entities;
  
  let postCounter: { id: string; counter?: bigint | undefined } | null = null;
  let publicationCounter: { id: string; counter?: bigint | undefined } | null =
    null;
  let channelCounter: { id: string; counter?: bigint | undefined } | null =
    null;
  let itemCounter: { id: string; counter?: bigint | undefined } | null = null;

  await PostCounter.upsert({
    // chain // messageGateway address
    // update nodeRegistryChain -> event.transaction.chainId after bumping to next version ponder
    id: `${nodeRegistryChain}/${event.transaction.to}`,
    create: {
        timestamp: event.block.timestamp,
        counter: BigInt(1)    
    },
    update: ({ current }) => ({
        timestamp: event.block.timestamp,
        counter: (current.counter as bigint) + BigInt(1)      
    }),
  });

  postCounter = await PostCounter.findUnique({
    id: `${nodeRegistryChain}/${event.transaction.to}`,
  });

  const cleanedTxnData = slice(event.transaction.input, 68);

  // skips first 68 bytes which contain 4 byte function selector + 32 byte data offset + 32 byte data length
  const decodedPost = decodePost({
    postInput: cleanedTxnData,
  });

  // do the userId -> signature recovery + expiration check stuff here?
  // posts only saved if they were valid.

  await Post.create({
    // update nodeRegistryChain -> event.transaction.chainId after bumping to next version ponder
    id: `${nodeRegistryChain}/${event.transaction.to}/${postCounter?.counter}`,
    data: {
      timestamp: event.block.timestamp,
      relayer: event.transaction.from,
      post: cleanedTxnData,
      userId: decodedPost?.userId,
      sigType: decodedPost?.sigType,
      sig: decodedPost?.sig,
      version: decodedPost?.version,
      expiration: decodedPost?.expiration,
      messageArray: decodedPost?.messageArray as Hash[],
    },
  });

  const length = decodedPost?.messageArray.length;
  if (length && length != 0) {
    type MessageToProcess = {
      msgType: bigint;
      msgBody: Hash;
    };

    const messageQueue: MessageToProcess[] = [];

    for (let i = 0; i < length; ++i) {
      const decodedMessage = decodeMessage({
        encodedMessage: decodedPost?.messageArray[i],
      });

      if (decodedMessage) {
        // Check if the messageQueue is not empty and
        // if decodedMessage.msgType is smaller than the last element's msgType
        if (
          messageQueue.length > 0 &&
          decodedMessage.msgType < messageQueue[messageQueue.length - 1].msgType
        ) {
          // this will only happen if messageQueue is NOT empty AND
          // the target decoded message type has a value smaller than the previous decoded message added to the queue
          // meaning it is out of order
          return;
        }
        messageQueue[i] = decodedMessage;
      }
    }

    // NOTE at this point, we now know that the messageQueue is ordered correctly

    console.log("messageQueue length ", messageQueue.length);
    console.log("completed messageQueue ", messageQueue);

    for (let i = 0; i < messageQueue.length; ++i) {
      await Message.create({
        // chain // messageGateway address // count of post being stored // index of message within Post
        // NOTE: do we potentially want a message counter as well thats separate from Post?
        //      I think not since feels helpful to have messages always live as sub unit of Posts
        // NOTE: update nodeRegistryChain -> event.transaction.chainId after bumping to next version ponder
        id: `${nodeRegistryChain}/${event.transaction.to}/${postCounter?.counter}/${i}`,
        data: {
          msgType: messageQueue[i]?.msgType,
          msgBody: messageQueue[i]?.msgBody,
        },
      });

      /* 
        do data specific checks
        1 = createPub. msgBody = abi.encode("ipfsString")
        2 = createChannel. msgBody = abi.encode("ipfsString")
        3 = addItemToChannel. msgBody = abi.encode(uint256 chainId, int256 id, address pointer, bool hasId)
            *** IF trying to add an item that is being curated in the same Post (earlier on in message queue),
            *** then the id in use must be a referential id created with negative number representing the index
            *** it was created by (ex: id = -1 instead of 1)
      */

      // initialize empty pubIdsCreated + channelIdsCreated for relative referencing
      let pubIdsCreated: bigint[] = []; // can be referenced with negative int256s starting with 1. ex: -10, -11, -12
      let channelIdsCreated: bigint[] = []; // can be referenced with negative int256s starting with 2. ex: -20, -21, -22

      console.log(
        "msg type heading into switch case: ",
        messageQueue[i]?.msgType
      );

      switch (messageQueue[i]?.msgType) {
        case BigInt(1): // createPublication
          console.log("running case 1");
          // decode msgBody into pub uri
          const decodedPubUri = decodeUri({ msgBody: messageQueue[i].msgBody });
          if (decodedPubUri) {
            await PublicationCounter.upsert({
              // chain // messageGateway address
              // update nodeRegistryChain -> event.transaction.chainId after bumping to next version ponder
              id: `${nodeRegistryChain}/${event.transaction.to}`,
              create: {
                timestamp: event.block.timestamp,
                counter: BigInt(1)                
              },
              update: ({ current }) => ({
                timestamp: event.block.timestamp,
                counter: (current.counter as bigint) + BigInt(1)
              }),
            });

            publicationCounter = await PublicationCounter.findUnique({
              // update nodeRegistryChain -> event.transaction.chainId after bumping to next version ponder
              id: `${nodeRegistryChain}/${event.transaction.to}`,
            });

            pubIdsCreated.push(publicationCounter?.counter as bigint);

            await Publication.create({
              id: `${publicationCounter?.counter as bigint}`,
              data: {
                timestamp: event.block.timestamp,
                creatorId: decodedPost?.userId,
                uri: decodedPubUri.uri,
              },
            });
          }
          break;
        case BigInt(2): // createChannel
          console.log("running case 2");
          // decode msgBody into channel uri
          const decodeChannelUriAndAccess = decodeUriAndAccess({
            msgBody: messageQueue[i].msgBody,
          });
          if (decodeChannelUriAndAccess) {
            await ChannelCounter.upsert({
              // chain // messageGateway address
              // update nodeRegistryChain -> event.transaction.chainId after bumping to next version ponder
              id: `${nodeRegistryChain}/${event.transaction.to}`,
              create: {
                timestamp: event.block.timestamp,
                counter: BigInt(1)
              },
              update: ({ current }) => ({
                timestamp: event.block.timestamp,
                counter: (current.counter as bigint) + BigInt(1),                
              }),
            });

            channelCounter = await ChannelCounter.findUnique({
              // update nodeRegistryChain -> event.transaction.chainId after bumping to next version ponder
              id: `${nodeRegistryChain}/${event.transaction.to}`,
            });

            channelIdsCreated.push(channelCounter?.counter as bigint);

            await Channel.create({
              id: `${channelCounter?.counter as bigint}`,
              data: {
                timestamp: event.block.timestamp,
                creatorId: decodedPost?.userId,
                uri: decodeChannelUriAndAccess.uri,
                admins: decodeChannelUriAndAccess.adminIds as bigint[],
                members: decodeChannelUriAndAccess.memberIds as bigint[],
              },
            });
          }
          break;
        case BigInt(3): // addItem
          console.log("running case 3");
          // decode msgBody into item
          const decodedItem = decodeItem({ msgBody: messageQueue[i].msgBody });
          if (decodedItem) {
            await ItemCounter.upsert({
              // chain // messageGateway address
              // update nodeRegistryChain -> event.transaction.chainId after bumping to next version ponder
              id: `${nodeRegistryChain}/${event.transaction.to}`,
              create: {
                timestamp: event.block.timestamp,
                counter: BigInt(1),
              },
              update: ({ current }) => ({
                timestamp: event.block.timestamp,
                counter: (current.counter as bigint) + BigInt(1),
              }),
            });

            itemCounter = await ItemCounter.findUnique({
              // update nodeRegistryChain -> event.transaction.chainId after bumping to next version ponder
              id: `${nodeRegistryChain}/${event.transaction.to}`,
            });

            let channelIdRef: bigint | null = null;
            let targetIdRef: bigint | null = null;

            // only enter channelIdRef assignment flow if item.id < 0
            if (decodedItem.channelId < 0) {
              // Convert the ID to a string for easier manipulation
              const idString = decodedItem.id.toString();
              if (idString.startsWith("-2")) {
                // Slice to remove '-2' and parse the remaining string as an integer
                const index = parseInt(idString.slice(2));
                channelIdRef = channelIdsCreated[index];
              } else {
                // dont process relative refs that start with something other than -1 or -2
                break;
              }
            }

            // only enter targetIdRef assignment flow if item.id < 0
            if (decodedItem.id < 0) {
              // Convert the ID to a string for easier manipulation
              const idString = decodedItem.id.toString();
              if (idString.startsWith("-1")) {
                // Slice to remove '-1' and parse the remaining string as an integer
                const index = parseInt(idString.slice(2));
                targetIdRef = pubIdsCreated[index];
              } else if (idString.startsWith("-2")) {
                // Slice to remove '-1' and parse the remaining string as an integer
                const index = parseInt(idString.slice(2));
                targetIdRef = channelIdsCreated[index];
              } else {
                // dont process relative refs that start with something other than -1 or -2
                break;
              }
            }

            await Item.create({
              // NOTE prob need to keep an item counter so these ids can be unique
              id: `${itemCounter?.counter as bigint}`,
              data: {                                          
                // context
                timestamp: event.block.timestamp,
                creatorId: decodedPost.userId,
                // NOTE might need to add relative referencing to channel field as well?
                //   would also mean need to update the item schema so that channelId can be negative
                // item
                chainId: decodedItem.chainId,
                target: decodedItem.target,
                hasId: decodedItem.hasId,
                targetId: targetIdRef ? targetIdRef : decodedItem.id,
                channel: channelIdRef
                  ? `${channelIdRef}`
                  : `${decodedItem.channelId}`,
              },
            });
          }
          break;
      }
    }
  }
});
