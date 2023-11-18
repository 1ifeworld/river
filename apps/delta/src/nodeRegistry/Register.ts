import { ponder } from '@/generated'
import { Hex } from 'viem'
import { nodeRegistryChain } from '../constants'
import {
  addresses,
  decodeMessage000,
  decodeAccess101,
  decodePublication201,
  decodeChannel301,
  decodeChannel302,
  isValidMessageId,
  generateChannelHash,
  publicationSchema,
} from 'scrypt'
import fetchIPFSData from '../utils/fetchIPFSData'

ponder.on('NodeRegistry:Register', async ({ event, context }) => {
  const { Node, Message, Publication, Channel, Item, Metadata } =
    context.entities
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
          let ipfsData
          if (decoded) {
            const ipfsData = await fetchIPFSData(decoded.uri)

            // Create or update Metadata entity
            await Metadata.upsert({
              id: decoded.uri,
              create: {
                name: ipfsData ? ipfsData.name : '',
                description: ipfsData ? ipfsData.description : '',
                imageUri: ipfsData ? ipfsData.image : '',
              },
              update: {
                name: ipfsData ? ipfsData.name : '',
                description: ipfsData ? ipfsData.description : '',
                imageUri: ipfsData ? ipfsData.image : '',
              },
            })
            // some fields were removed please check publication entity for full schema
            await Publication.upsert({
              id: `${nodeRegistryChain}/${event.transaction.to}/${schema}/${nodeId}`,
              create: {
                uri: decoded.uri,
              },
              update: {
                uri: decoded.uri,
              },
            })
          }
        } else if (decodedMsg.msgType === BigInt(301)) {
          const decoded = decodeChannel301({ msgBody: decodedMsg.msgBody })
          if (decoded) {
            const ipfsData = await fetchIPFSData(decoded.uri)
            console.log('DATA', ipfsData?.name)
            await Metadata.upsert({
              id: decoded.uri,
              create: {
                name: ipfsData ? ipfsData.name : '',
                description: ipfsData ? ipfsData.description : '',
                imageUri: ipfsData ? ipfsData.image : '',
              },
              update: {
                name: ipfsData ? ipfsData.name : '',
                description: ipfsData ? ipfsData.description : '',
                imageUri: ipfsData ? ipfsData.image : '',
              },
            })
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
                createdAt: event.block.timestamp,
                createdByID: userId,
                nodeId: nodeId,
              },
              update: {
                uri: decoded.uri,
                createdAt: event.block.timestamp,
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
                  nodeId: nodeId
                },
                update: {},
              })

              // if (decoded.pointer === addresses.nodeRegistry.opGoerli && decoded.hasId) {
                const targetPublication = await Publication.findUnique({id:`${nodeRegistryChain}/${addresses.nodeRegistry.opGoerli}/${publicationSchema}/${decoded.id}` }) 
                const targetMetadata = await Metadata.findUnique({id: targetPublication?.id as string}) 
            


              await Item.create({
                id: `${nodeRegistryChain}/${event.transaction.to}/${schema}/${nodeId}/${event.transaction.hash}/${event.log.logIndex}`,
                data: {
                  // pointer
                  chainId: decoded.chainId,
                  targetId: decoded.id,
                  target: decoded.pointer,
                  hasId: decoded.hasId,
                  createdAt: event.block.timestamp,
                  channel: `${nodeRegistryChain}/${event.transaction.to}/${schema}/${nodeId}`,
                  // item
                  userId: userId,
                  targetMetadata: targetMetadata?.id
                },
              })
            }
          }
        }
      }
    }
  } 
})

