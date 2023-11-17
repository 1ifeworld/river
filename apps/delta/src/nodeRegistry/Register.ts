import { ponder } from '@/generated'
import { Hex } from 'viem'
import { nodeRegistryChain } from '../constants'
import {
  decodeMessage000,
  decodeAccess101,
  decodePublication201,
  decodeChannel301,
  decodeChannel302,
  isValidMessageId,
  generateChannelHash,
} from 'scrypt'
import fetchIPFSData from "../utils/fetchIPFSData"

ponder.on('NodeRegistry:Register', async ({ event, context }) => {
  const { Node, Message, Publication, Channel, Item } = context.entities
  const { sender, userId, schema, nodeId, messages } = event.params

  console.log(`Node ${nodeId} Registered`)
  const validUser = true // Placeholder for user validation logic

  if (validUser) {
    await Node.create({
      id: `${nodeRegistryChain}/${event.transaction.to}/${nodeId}`,
      data: {
        sender: sender,
        userId: userId,
        schema: schema,
        nodeId: nodeId,
        nodeAdmin: [],
        nodeMembers: [],
      },
    })

    for (let i = 0; i < messages.length; ++i) {
      const decodedMsg = decodeMessage000({ encodedMsg: messages[i] })
      if (decodedMsg && isValidMessageId(decodedMsg.msgType)) {
        await Message.create({
          id: `${nodeRegistryChain}/${event.transaction.to}/${event.transaction.hash}/${event.log.logIndex}/${i}`,
          data: {
            nodeId: nodeId,
            node: `${nodeRegistryChain}/${event.transaction.to}/${nodeId}`,
            sender: sender,
            msgType: decodedMsg.msgType,
            msgBody: decodedMsg.msgBody,
            userId: userId,
          },
        })
        if (decodedMsg.msgType === BigInt(101)) {
          const decoded = decodeAccess101({ msgBody: decodedMsg.msgBody })
          if (decoded) {
            await Node.update({
              id: `${nodeRegistryChain}/${event.transaction.to}/${nodeId}`,
              data: {
                nodeAdmin: decoded?.admins as bigint[],
                nodeMembers: decoded?.members as bigint[],
              },
            })
          } else {
            return
          }
        } else if (decodedMsg.msgType === BigInt(201)) {
          const decoded = decodePublication201({ msgBody: decodedMsg.msgBody })
          let ipfsData;
          if (decoded) {
            ipfsData = await fetchIPFSData(decoded.uri);
          }
            // some fields were removed please check publication entity for full schema
            await Publication.upsert({
            id: `${nodeRegistryChain}/${event.transaction.to}/${schema}/${nodeId}`,
            create: {
              uri: decoded ? decoded.uri : '',
              name: ipfsData ? ipfsData.name : '',
              description: ipfsData ? ipfsData.description : '',
              thumbnailURL: ipfsData ? ipfsData.image : '',
              createdDate: event.block.timestamp,
            },
            update: {
              uri: decoded ? decoded.uri : '',
              name: ipfsData ? ipfsData.name : '',
              description: ipfsData ? ipfsData.description : '',
              thumbnailURL: ipfsData ? ipfsData.image : '',
            },
          })
        } else if (decodedMsg.msgType === BigInt(301)) {
          const decoded = decodeChannel301({ msgBody: decodedMsg.msgBody });
          if (decoded) {
              const ipfsData = await fetchIPFSData(decoded.uri);
              await Channel.upsert({
                  id: `${nodeRegistryChain}/${event.transaction.to}/${schema}/${nodeId}`,
                  create: {
                      hashId: generateChannelHash({
                          chainId: nodeRegistryChain,
                          nodeRegistryAddress: event.transaction.to as Hex,
                          schema: schema,
                          nodeId: nodeId,
                      }),
                      uri: decoded.uri,
                      name: ipfsData ? ipfsData.name : '',
                      description: ipfsData ? ipfsData.description : '',
                      coverImageURI: ipfsData ? ipfsData.image : '',
                      createdAt: event.block.timestamp, 
                      createdByID: userId,

                  },
                  update: {
                      uri: decoded.uri,
                      name: ipfsData ? ipfsData.name : '',
                      description: ipfsData ? ipfsData.description : '',
                      coverImageURI: ipfsData ? ipfsData.image : '',
                      createdAt: event.block.timestamp 
                  },
              })
      } else if (decodedMsg.msgType === BigInt(302)) {
            const decoded = decodeChannel302({ msgBody: decodedMsg.msgBody })
            if (decoded) {
              await Channel.upsert({
                id: `${nodeRegistryChain}/${event.transaction.to}/${schema}/${nodeId}`,
                create: {
                  hashId: generateChannelHash({
                    chainId: nodeRegistryChain,
                    nodeRegistryAddress: event.transaction.to as Hex,
                    schema: schema,
                    nodeId: nodeId,
                  }),
                },
                update: {},
              })
  
              await Item.create({
                id: `${nodeRegistryChain}/${event.transaction.to}/${schema}/${nodeId}/${event.transaction.hash}/${event.log.logIndex}`,
                data: {
                  // pointer 
                  chainId: decoded.chainId,
                  targetId: decoded.id,
                  target: decoded.pointer,
                  hasId: decoded.hasId,
                  channel: `${nodeRegistryChain}/${event.transaction.to}/${schema}/${nodeId}`,
                  // item 
                  userId: userId,
                },
              })
            }
          }
        }
      }
    }
  }
  })