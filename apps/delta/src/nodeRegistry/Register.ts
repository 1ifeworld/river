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
    const { Node, Message, Publication, Channel, Item, RiverValidatorV1, Register } = context.entities;
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
        console.log("messages.length", messages.length)
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
    }
})
  
    // const decodedNodeRegistrationStruct = decodeNodeRegistrationData({
    //   data: data,
    // });
  
    // // exit crud process if node registration decoding returns null
    // if (decodedNodeRegistrationStruct == null) return;
  
    // const decodedAccessControlData = decodeAdminWithMembersData({
    //   msgType: decodedNodeRegistrationStruct.msgType,
    //   msgBody: decodedNodeRegistrationStruct.msgBody,
    // });
  
    // // exit crud process if access control decoding returns null
    // if (decodedAccessControlData == null) return;
  
    // // write decoded data to database
    // await Node.create({
    //   id: `420/${event.transaction.from}/${nodeId}`,
    //   data: {
    //     sender: sender,
    //     nodeId: nodeId,
    //     userId: decodedNodeRegistrationStruct.userId,
    //     schema: decodedNodeRegistrationStruct.schema,
    //     msgType: decodedNodeRegistrationStruct.msgType,
    //     msgBody: decodedNodeRegistrationStruct.msgBody,
    //     nodeAdmin: decodedAccessControlData.admin,
    //     nodeMembers: decodedAccessControlData.members as bigint[],
    //   },
    // });
  
    // if (decodedNodeRegistrationStruct.schema === publicationSchema.toLowerCase()) {
    //   await Publication.create({
    //     id: `420/${publicationSchema}/${nodeId}`,
    //     data: {
    //       // this is set to empty since currently we do not allow for setting
    //       //    the uri of a Publication on registration
    //       uri: "",
    //     },
    //   });
    // } else if (decodedNodeRegistrationStruct.schema === channelSchema.toLowerCase()) {
    //   await Channel.create({
    //     id: `420/${channelSchema}/${nodeId}`,
    //     data: undefined,
    //   });
    // }


// ponder.on("NodeRegistry:RegisterNode", async ({ event, context }) => {
//   const { Node, Publication, Channel } = context.entities;
//   const { sender, nodeId, data } = event.params;

//   console.log("nodeId registered", nodeId);

//   const decodedNodeRegistrationStruct = decodeNodeRegistrationData({
//     data: data,
//   });

//   // exit crud process if node registration decoding returns null
//   if (decodedNodeRegistrationStruct == null) return;

//   const decodedAccessControlData = decodeAdminWithMembersData({
//     msgType: decodedNodeRegistrationStruct.msgType,
//     msgBody: decodedNodeRegistrationStruct.msgBody,
//   });

//   // exit crud process if access control decoding returns null
//   if (decodedAccessControlData == null) return;

//   // write decoded data to database
//   await Node.create({
//     id: `420/${event.transaction.from}/${nodeId}`,
//     data: {
//       sender: sender,
//       nodeId: nodeId,
//       userId: decodedNodeRegistrationStruct.userId,
//       schema: decodedNodeRegistrationStruct.schema,
//       msgType: decodedNodeRegistrationStruct.msgType,
//       msgBody: decodedNodeRegistrationStruct.msgBody,
//       nodeAdmin: decodedAccessControlData.admin,
//       nodeMembers: decodedAccessControlData.members as bigint[],
//     },
//   });

//   if (decodedNodeRegistrationStruct.schema === publicationSchema.toLowerCase()) {
//     await Publication.create({
//       id: `420/${publicationSchema}/${nodeId}`,
//       data: {
//         // this is set to empty since currently we do not allow for setting
//         //    the uri of a Publication on registration
//         uri: "",
//       },
//     });
//   } else if (decodedNodeRegistrationStruct.schema === channelSchema.toLowerCase()) {
//     await Channel.create({
//       id: `420/${channelSchema}/${nodeId}`,
//       data: undefined,
//     });
//   }
// });

// ponder.on("NodeRegistry:MessageNode", async ({ event, context }) => {
//   const { Node, Call, Publication, Item } = context.entities;
//   const { sender, messageId, data } = event.params;

//   const decodedCallNodeStruct = decodeNodeCallData({
//     data: data,
//   });

//   // exit crud process if node registration decoding returns null
//   if (decodedCallNodeStruct == null) return;

//   // enter logic fork depending on what schema is associated with the target node
//   // chainId / nodeRegistryAddress / nodeId
//   const targetNode = await Node.findUnique({
//     id: `420/${event.transaction.from}/${decodedCallNodeStruct.nodeId}`,
//   });

//   await Call.create({
//     id: `420/${event.transaction.from}/${messageId}`,
//     data: {
//       sender: sender,
//       nodeId: decodedCallNodeStruct.nodeId,
//       schema: targetNode?.schema as string,
//       userId: decodedCallNodeStruct.userId,
//       msgType: decodedCallNodeStruct.msgType,
//       msgBody: decodedCallNodeStruct.msgBody,
//     },
//   });

//   if (targetNode?.schema === publicationSchema.toLowerCase()) {
//     const decodedPublicationMessageData = decodeMessagePublicationData({
//       msgType: decodedCallNodeStruct.msgType,
//       msgBody: decodedCallNodeStruct.msgBody,
//     });
//     // exit crud process if publication message decoding returns null
//     if (decodedPublicationMessageData == null) return;

//     await Publication.upsert({
//       id: `420/${publicationSchema}/${decodedCallNodeStruct.nodeId}`,
//       create: {
//         uri: decodedPublicationMessageData.uri,
//       },
//       update: {
//         uri: decodedPublicationMessageData.uri,
//       },
//     });
//   } else if (targetNode?.schema === channelSchema.toLowerCase()) {
//     const decodedChannelMessageData = decodeMessageChannelData({
//       msgType: decodedCallNodeStruct.msgType,
//       msgBody: decodedCallNodeStruct.msgBody,
//     });
//     // exit crud process if channel message decoding returns null
//     if (decodedChannelMessageData == null) return;

//     await Item.create({
//       id: `420/${channelSchema}/${decodedCallNodeStruct.nodeId}`,
//       data: {
//         chainId: decodedChannelMessageData.chainId,
//         targetId: decodedChannelMessageData.id,
//         target: decodedChannelMessageData.target,
//         hasId: decodedChannelMessageData.hasId,
//         channel: `420/${channelSchema}/${decodedCallNodeStruct.nodeId}`,
//       },
//     });
//   }
// });

// Node.findMany

// if (!isValidUserId(userId)) return;
// if (!isValidNodeSchema(schema)) return;
// if (!isValidReg(regType, regBody)) return;
// const { admin, members, uri } = processNodeRegistrationData(regType, regBody)
// const { name, description, coverImage } = procesChannelUri(uri)

// ponder.on('NodeRegistry:RegisterSchema', async ({ event, context }) => {
//   const { Schema } = context.entities
//   const { sender, schema, data } = event.params
//   // check if schema registration evnet is valid. exit crud loop if not
//     if (
//       !isValidSchemaRegistration({ sender: sender, schema: schema, data: data })
//     )
//       return;

//   // enter new schema in table
//   await Schema.create({
//     // chainId // keccak256(chainId, registryAddress, schemaCount)
//     id: `420/${schema}`,
//     data: {
//       sender: sender,
//       schema: schema,
//       data: data,
//     },
//   })
// })
