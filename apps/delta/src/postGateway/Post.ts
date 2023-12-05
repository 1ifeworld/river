import { ponder } from "@/generated";
import { postGatewayChain } from "../constants";
import {
  decodePost,
  decodeMessage,
  decodeUri,
  decodeAccess,
  decodeUriAndAccess,
  decodeItem,
  decodePubItem,
  decodeNFTItem,
  TargetType,
  messageTypes,
} from "scrypt";
import { Hash, Hex, slice } from "viem";

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
    Target,
    Nft,
    Txn,
  } = context.entities;

  let postCounter: { id: string; counter?: bigint | undefined } | null = null;
  let publicationCounter: { id: string; counter?: bigint | undefined } | null =
    null;
  let channelCounter: { id: string; counter?: bigint | undefined } | null =
    null;
  let itemCounter: { id: string; counter?: bigint | undefined } | null = null;

  await PostCounter.upsert({
    // chain // messageGateway address
    // update postGatewayChain -> event.transaction.chainId after bumping to next version ponder
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

  postCounter = await PostCounter.findUnique({
    id: `${postGatewayChain}/${event.transaction.to}`,
  });

  const cleanedTxnData = slice(event.transaction.input, 68);

  // skips first 68 bytes which contain 4 byte function selector + 32 byte data offset + 32 byte data length
  const decodedPost = decodePost({
    postInput: cleanedTxnData,
  });

  // do the userId -> signature recovery + expiration check stuff here?
  // posts only saved if they were valid.

  await Post.create({
    // update postGatewayChain -> event.transaction.chainId after bumping to next version ponder
    id: `${postGatewayChain}/${event.transaction.to}/${postCounter?.counter}`,
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
      console.log("message: ", decodedPost?.messageArray[i]);

      const decodedMessage = decodeMessage({
        encodedMessage: decodedPost?.messageArray[i],
      });

      console.log("message type: ", decodedMessage?.msgType);

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

    // initialize empty pubIdsCreated + channelIdsCreated for relative referencing
    console.log("messageQueue length ", messageQueue.length);
    console.log("completed messageQueue ", messageQueue);

    let pubIdsCreated: bigint[] = []; // can be referenced with negative int256s starting with 1. ex: -10, -11, -12
    let channelIdsCreated: bigint[] = []; // can be referenced with negative int256s starting with 2. ex: -20, -21, -22

    for (let i = 0; i < messageQueue.length; ++i) {
      await Message.create({
        // chain // messageGateway address // count of post being stored // index of message within Post
        // NOTE: do we potentially want a message counter as well thats separate from Post?
        //      I think not since feels helpful to have messages always live as sub unit of Posts
        // NOTE: update postGatewayChain -> event.transaction.chainId after bumping to next version ponder
        id: `${postGatewayChain}/${event.transaction.to}/${postCounter?.counter}/${i}`,
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

      console.log(
        "msg type heading into switch case: ",
        messageQueue[i]?.msgType
      );

      switch (messageQueue[i]?.msgType) {
        case BigInt(messageTypes.createPublication): // 110
          console.log("running case 1");
          // decode msgBody into pub uri
          const decodedPubUri = decodeUri({ msgBody: messageQueue[i].msgBody });
          if (decodedPubUri) {
            await PublicationCounter.upsert({
              // chain // messageGateway address
              // update postGatewayChain -> event.transaction.chainId after bumping to next version ponder
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

            publicationCounter = await PublicationCounter.findUnique({
              // update postGatewayChain -> event.transaction.chainId after bumping to next version ponder
              id: `${postGatewayChain}/${event.transaction.to}`,
            });

            pubIdsCreated.push(publicationCounter?.counter as bigint);

            console.log("pub ids created right after push ", pubIdsCreated);

            await Publication.create({
              id: publicationCounter?.counter as bigint,
              data: {
                timestamp: event.block.timestamp,
                creatorId: decodedPost?.userId,
                uri: decodedPubUri.uri,
              },
            });
          }
          break;
        case BigInt(messageTypes.createChannel): // 210
          console.log("running case 2");
          // decode msgBody into channel uri
          const decodeChannelUriAndAccess = decodeUriAndAccess({
            msgBody: messageQueue[i].msgBody,
          });
          if (decodeChannelUriAndAccess) {
            await ChannelCounter.upsert({
              // chain // messageGateway address
              // update postGatewayChain -> event.transaction.chainId after bumping to next version ponder
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

            channelCounter = await ChannelCounter.findUnique({
              // update postGatewayChain -> event.transaction.chainId after bumping to next version ponder
              id: `${postGatewayChain}/${event.transaction.to}`,
            });

            channelIdsCreated.push(channelCounter?.counter as bigint);

            await Channel.create({
              id: channelCounter?.counter as bigint,
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
        case BigInt(messageTypes.addItem): // 213
          console.log("running case 3");
          // decode msgBody into item
          const decodedItem = decodeItem({
            msgBody: messageQueue[i].msgBody,
          });

          if (decodedItem) {
            await ItemCounter.upsert({
              // chain // messageGateway address
              // update postGatewayChain -> event.transaction.chainId after bumping to next version ponder
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

            itemCounter = await ItemCounter.findUnique({
              // update postGatewayChain -> event.transaction.chainId after bumping to next version ponder
              id: `${postGatewayChain}/${event.transaction.to}`,
            });

            let channelIdRef: bigint | null = null;
            let pubIdRef: bigint | null = null;

            // NOTE: this should be moved into scrypt
            const deconstructedItemBody: {
              channel: Hash;
              data: Hash;
            } = {
              channel: slice(decodedItem.itemBody, 0, 32, { strict: true }),
              data: slice(decodedItem.itemBody, 32),
            };

            // NOTE this chunk of code allows for targeting of channel being created in same post
            //   only enter channelIdRef assignment flow if item.id < 0
            if (BigInt(deconstructedItemBody.channel) < 0) {
              // Convert the ID to a string for easier manipulation
              const channelIdString = BigInt(
                deconstructedItemBody.channel
              ).toString();
              if (channelIdString.startsWith("-2")) {
                // Slice to remove '-2' and parse the remaining string as an integer
                const index = parseInt(channelIdString.slice(2));
                channelIdRef = channelIdsCreated[index];
              } else {
                // dont process relative refs that start with something other than -1 or -2
                break;
              }
            }

            // create item that will point to target to oneof pub/nft/url
            await Item.create({
              id: itemCounter?.counter as bigint,
              data: {
                timestamp: event.block.timestamp,
                creatorId: decodedPost.userId,
                channel: channelIdRef
                  ? channelIdRef
                  : BigInt(deconstructedItemBody.channel),
                target: itemCounter?.counter as bigint,
                type: decodedItem.itemType,
              },
            });

            console.log("decodedItem.itemType: ", decodedItem.itemType);
            switch (decodedItem.itemType) {
              case TargetType.PUB:
                console.log("it was type PUB");
                const pub = decodePubItem({
                  itemBody: deconstructedItemBody.data,
                });
                console.log("decoded pub value: ", pub);
                console.log("decoded pub id value: ", pub?.pubId);
                if (pub) {
                  // NOTE this chunk of code allows for targeting of channel being created in same post
                  //   only enter pubIdRef assignment flow if item.id < 0
                  if (pub.pubId < 0) {
                    // Convert the ID to a string for easier manipulation
                    const pubIdString = pub.pubId.toString();
                    if (pubIdString.startsWith("-1")) {
                      // Slice to remove '-1' and parse the remaining string as an integer
                      const index = parseInt(pubIdString.slice(2));
                      console.log("pubRefIndex", 0);
                      pubIdRef = pubIdsCreated[index];
                      console.log("pubIdsCreated array", pubIdsCreated);
                      console.log("confirmed pubIdRef", pubIdRef);
                    } else {
                      // dont process relative refs that start with something other than -1 or -2
                      break;
                    }
                  }

                  await Target.create({
                    id: itemCounter?.counter as bigint,
                    data: {
                      type: decodedItem.itemType,
                      publication: pubIdRef ? pubIdRef : pub.pubId,
                    },
                  });
                }
                break;
              case TargetType.NFT:
                // decode nft because is itemType
                const nft = decodeNFTItem({
                  itemBody: deconstructedItemBody.data,
                });
                // if decoded incorrectly dont create target or NFT
                if (nft) {
                  await Nft.create({
                    id: `${itemCounter?.counter as bigint}`,
                    data: {
                      chainId: nft?.chainId as bigint,
                      targetContract: nft?.target as Hex,
                      hasId: nft?.hasId as boolean,
                      tokenId: nft?.id,
                    },
                  });

                  await Target.create({
                    id: itemCounter?.counter as bigint,
                    data: {
                      type: decodedItem.itemType,
                      nft: `${itemCounter?.counter as bigint}`,
                    },
                  });
                }
              case TargetType.URL:
                break;
            }
          }
      }
    }
  }
  // record every transaction that has entered the crud cycle
  const txnHashProcessedCheck = await Txn.findUnique({
    id: event.block.hash
  });
  if (!txnHashProcessedCheck) {
    await Txn.create({
      id: event.block.hash
    })
  }
});
