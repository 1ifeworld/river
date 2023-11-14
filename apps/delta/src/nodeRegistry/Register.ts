import { ponder } from "@/generated";
import { Hex } from "viem";
import {
  decodeMessage000,
  decodeAccess101,
  decodePublication201,
  decodeChannel301,
  decodeChannel302,
  decodeChannel303,
  publicationSchema,
  channelSchema,
  isValidMessageId,
  addresses
} from "offchain-schema";

ponder.on("NodeRegistry:Register", async ({ event, context }) => {
    const { Node, Message, Publication, Channel, Item } = context.entities;
    const { sender, userId, schema, nodeId, messages } = event.params;
    
    console.log(`Node $${nodeId} Registered`);  

    // the future version is
    // check if sender is either the owner or a delegate address for this id
    // const targetUser = await RiverValidatorV1.findUnique({
    //     id: `420/${addresses.riverValidatorV1.opGoerli}/${userId}`
    // })

    // all events will go through for now
    const validUser = true; 

    // Check if user is valid
    if (validUser) {
        // Create valid node ids regardless if init msgs are valid
        await Node.create({
            id: `420/${event.transaction.from}/${nodeId}`,
            data: {
                sender: sender,
                userId: userId,
                schema: schema,
                nodeId: nodeId,
                msgType: BigInt(0),   // empty
                msgBody: '0x',        // empty
                nodeAdmin: [],        // empty
                nodeMembers: []       // empty
            },
        });          
        // Well need to update this to something like:
        // -- if the first message being sent is NOT a VALID 100 level access message
        // -- then dont enter the processing loop everythign
        // There is also an issue that all emssages downstream of the 100 level message
        // -- have to preform access checks because techicanlly the initializing 100 message
        // -- could have set admin/member params that dont allow the userId to 
        // -- process the message they are trying to
        console.log("register messages.length", messages.length)
        for (let i = 0; i < messages.length; ++i) {            
            // decode msg. will be null if invalid data, so add logic check after
            const decodedMsg = decodeMessage000({encodedMsg: messages[i]})
            // check if decodedMsg was null
            if (decodedMsg && isValidMessageId(decodedMsg.msgType)) {                    
                // record every properly decoded msg
                await Message.create({
                    id: `420/${event.transaction.from}/${event.transaction.hash}/${event.log.logIndex}/${i}`,
                    data: {
                        sender: sender,
                        userId: userId,
                        msgType: decodedMsg.msgType,
                        msgBody: decodedMsg.msgBody                          
                    }
                })                               
                // process msgBody depending on msgType
                if (decodedMsg.msgType === BigInt(101)) {
                    // attempt to decode access control body
                    const decoded = decodeAccess101({msgBody: decodedMsg.msgBody})
                    // if successful, enter crud logic, if not exit
                    if (decoded) {                        
                        await Node.update({
                            id: `420/${event.transaction.from}/${nodeId}`,
                            data: {
                                nodeAdmin: decoded?.admins as bigint[],
                                nodeMembers: decoded?.members as bigint[]
                            },
                        });    
                    } else {
                        // this exists the entire crud loop if no access controll set
                        return
                    }
                } else if (decodedMsg.msgType === BigInt(201)) {
                    const decoded = decodePublication201({msgBody: decodedMsg.msgBody})
                    if (decoded) {                                                    
                        await Publication.create({
                            id: `420/${event.transaction.from}/${schema}/${nodeId}`,
                            data: {
                                uri: decoded.uri
                            },
                        });    
                    }
                } else if (decodedMsg.msgType == BigInt(301)) {
                    const decoded = decodeChannel301({msgBody: decodedMsg.msgBody})
                    if (decoded) {                        
                        await Channel.upsert({
                            id: `420/${event.transaction.from}/${schema}/${nodeId}`,
                            create: {
                                uri: decoded.uri
                            },
                            update: {
                                uri: decoded.uri
                            }
                        });    
                    }
                } else if (decodedMsg.msgType == BigInt(302)) {
                    const decoded = decodeChannel302({msgBody: decodedMsg.msgBody})
                    if (decoded) {                        
                        // create channel if it doesnt already exist by this point
                        //      it might already exist, but if it does, we dont want to update the uri
                        await Channel.upsert({
                            id: `420/${event.transaction.from}/${schema}/${nodeId}`,
                            create: {},
                            update: {}
                        });    
                        // create item and associate it with the parent
                        console.log("Decoded channel", decoded)

                        await Item.create({
                            id: `420/${event.transaction.from}/${schema}/${nodeId}/${event.transaction.hash}/${event.log.logIndex}`,
                            data: {
                                chainId: decoded.chainId,
                                targetId: decoded.id,
                                target: decoded.pointer,
                                hasId: decoded.hasId,
                                channel: `420/${event.transaction.from}/${schema}/${nodeId}`,
                            },
                        });                            
                    }
                }                   
            }
        }
    }
})

ponder.on("NodeRegistry:Update", async ({ event, context }) => {
    const { Node, Message, Publication, Channel, Item } = context.entities;
    const { sender, userId, nodeId, messages } = event.params;
    
    console.log(`Node $${nodeId} Updated`);  

    // the future version is
    // check if sender is either the owner or a delegate address for this id
    // const targetUser = await RiverValidatorV1.findUnique({
    //     id: `420/${addresses.riverValidatorV1.opGoerli}/${userId}`
    // })

    // all events will go through for now
    const validUser = true; 

    // check that target node exists
    const targetNode = await Node.findUnique({
        id: `420/${event.transaction.from}/${nodeId}`
    })    

    // Check if user is valid
    if (validUser && targetNode) {
        
        // this schema will be used for targeting correct nodes in crud
        const schema = targetNode.schema
    
        console.log("update messages.length", messages.length)
        for (let i = 0; i < messages.length; ++i) {            
            // decode msg. will be null if invalid data, so add logic check after
            const decodedMsg = decodeMessage000({encodedMsg: messages[i]})
            // check if decodedMsg was null
            if (decodedMsg && isValidMessageId(decodedMsg.msgType)) {                    
                // record every properly decoded msg
                await Message.create({
                    id: `420/${event.transaction.from}/${event.transaction.hash}/${event.log.logIndex}/${i}`,
                    data: {
                        sender: sender,
                        userId: userId,
                        msgType: decodedMsg.msgType,
                        msgBody: decodedMsg.msgBody                          
                    }
                })                               
                // process msgBody depending on msgType
                if (decodedMsg.msgType === BigInt(101)) {
                    // attempt to decode access control body
                    const decoded = decodeAccess101({msgBody: decodedMsg.msgBody})
                    // if successful, enter crud logic, if not exit
                    if (decoded) {                        
                        await Node.update({
                            id: `420/${event.transaction.from}/${nodeId}`,
                            data: {
                                nodeAdmin: decoded?.admins as bigint[],
                                nodeMembers: decoded?.members as bigint[]
                            },
                        });    
                    } else {
                        // this exists the entire crud loop if no access controll set
                        return
                    }
                } else if (decodedMsg.msgType === BigInt(201)) {
                    const decoded = decodePublication201({msgBody: decodedMsg.msgBody})
                    if (decoded) {                                                    
                        await Publication.update({
                            id: `420/${event.transaction.from}/${schema}/${nodeId}`,
                            data: {
                                uri: decoded.uri
                            },
                        });    
                    }
                } else if (decodedMsg.msgType == BigInt(301)) {
                    const decoded = decodeChannel301({msgBody: decodedMsg.msgBody})
                    if (decoded) {                        
                        await Channel.update({
                            id: `420/${event.transaction.from}/${schema}/${nodeId}`,
                            data: {
                                uri: decoded.uri
                            },
                        });    
                    }
                } else if (decodedMsg.msgType == BigInt(302)) {
                    const decoded = decodeChannel302({msgBody: decodedMsg.msgBody})
                    if (decoded) {                        
                        await Item.create({
                            id: `420/${event.transaction.from}/${schema}/${nodeId}/${event.transaction.hash}/${event.log.logIndex}`,
                            data: {
                                chainId: decoded.chainId,
                                targetId: decoded.id,
                                target: decoded.pointer,
                                hasId: decoded.hasId,
                                channel: `420/${event.transaction.from}/${schema}/${nodeId}`,
                            },
                        });                            
                    }
                }                   
            }
        }
    }
})