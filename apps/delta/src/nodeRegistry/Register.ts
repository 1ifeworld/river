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

ponder.on('NodeRegistry:Register', async ({ event, context }) => {
  const { Node, Message, Publication, Channel, Item } = context.entities
  const { sender, userId, schema, nodeId, messages } = event.params

  console.log(`Node $${nodeId} Registered`)
  const validUser = true

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
            sender: sender,
            userId: userId,
            node: `${nodeRegistryChain}/${event.transaction.to}/${nodeId}`,
            nodeId: nodeId,
            msgType: decodedMsg.msgType,
            msgBody: decodedMsg.msgBody,
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
          if (decoded) {
            await Publication.create({
              id: `${nodeRegistryChain}/${event.transaction.to}/${schema}/${nodeId}`,
              data: {
                uri: decoded.uri,
              },
            })
          }
        } else if (decodedMsg.msgType == BigInt(301)) {
          const decoded = decodeChannel301({ msgBody: decodedMsg.msgBody })
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
                uri: decoded.uri,
              },
              update: {
                uri: decoded.uri,
              },
            })
          }
        } else if (decodedMsg.msgType == BigInt(302)) {
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
                chainId: decoded.chainId,
                targetId: decoded.id,
                target: decoded.pointer,
                userId: userId,
                hasId: decoded.hasId,
                channel: `${nodeRegistryChain}/${event.transaction.to}/${schema}/${nodeId}`,
              },
            })
          }
        }
      }
    }
  }
})
