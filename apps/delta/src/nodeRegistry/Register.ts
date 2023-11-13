import { ponder } from "@/generated";
// import { isValidSchemaRegistration } from "offchain-schema";
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
    const { Node, Message, Publication, Channel, RiverValidatorV1 } = context.entities;
    const { sender, schema, nodeId, messages } = event.params;
  
    console.log(`Node $${nodeId} Registered`);  

    for (let i = 0; i < messages.length; ++i) {

        // NOTE: this is where we should add in a message counting function,
        // which will allow us to pass in a message count value
        // later on in the crud

        // decode msg. will be null if invalid data, so add logic check after
        const decodedMsg = decodeMessage000({encodedMsg: messages[i]})
        // check if decodedMsg was null
        if (decodedMsg) {
            // retrieve user id status from river validator
            const targetUser = await RiverValidatorV1.findUnique({
                id: `420/${addresses.riverValidatorV1.opGoerli}/${decodedMsg.userId}`
            })
            // check if targetUser was marked valid by river validator
            if (targetUser?.status) {
                // Create valid node ids regardless if init msgs are valid
                await Node.create({
                    id: `420/${event.transaction.from}/${nodeId}`,
                    data: {
                      sender: sender,
                      userId: decodedMsg.userId,
                      schema: schema,
                      nodeId: nodeId,
                      msgType: BigInt(0),   // empty
                      msgBody: '0x',        // empty
                      nodeAdmin: [],        // empty
                      nodeMembers: []       // empty
                    },
                  });                
                // check if decoded msg has a valid msgType
                if (isValidMessageId(decodedMsg.msgType)) {


                    // need to figure out how to add an internal message counter
                    await Message.create({
                        id: `420/${event.transaction.from}/${nodeId}`,
                        data: {
                            sender: sender,
                            userId: decodedMsg.userId,
                            msgType: decodedMsg.msgType,
                            msgBody: decodedMsg.msgBody
                        }
                    })




                    // process msgBody depending on msgType
                    /* MessageId 101: Access -- AdminsWithMembers */
                    if (decodedMsg.msgType === BigInt(101)) {
                        // attempt to decode access control body
                        const decodedAC = decodeAccess101({msgBody: decodedMsg.msgBody})
                        // if successful, enter crud logic, if not exit
                        if (decodedAC) {
                    
                        }
                    }        
                }
            }
        }
    }
  
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
  });


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
