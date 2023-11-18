import { ponder } from '@/generated'
import { nodeRegistryChain } from '../constants'
import {
  decodeMessage000,
  decodeAccess101,
  decodePublication201,
  decodeChannel301,
  decodeChannel302,
  isValidMessageId,
} from 'scrypt'

ponder.on('NodeRegistry:Update', async ({ event, context }) => {
  const { Node, Message, Publication, Channel, Item } = context.entities
  const { sender, userId, nodeId, messages } = event.params

  console.log(`Node $${nodeId} Updated`)
  const validUser = true

  if (validUser) {
    const targetNode = await Node.findUnique({
      id: `${nodeRegistryChain}/${event.transaction.to}/${nodeId}`,
    })

    if (targetNode) {
      const schema = targetNode.schema

      console.log('update messages.length', messages.length)
      for (let i = 0; i < messages.length; ++i) {
        const decodedMsg = decodeMessage000({ encodedMsg: messages[i] })
        if (decodedMsg && isValidMessageId(decodedMsg.msgType)) {
          await Message.create({
            id: `420/${event.transaction.from}/${event.transaction.hash}/${event.log.logIndex}/${i}`,
            data: {
              sender: sender,
              userId: userId,
              node: `420/${event.transaction.from}/${nodeId}`,
              nodeId: nodeId,
              msgType: decodedMsg.msgType,
              msgBody: decodedMsg.msgBody,
            },
          })

          console.log("what msg type is in this update: ", decodedMsg.msgType)

          if (decodedMsg.msgType === BigInt(101)) {
            const decoded = decodeAccess101({ msgBody: decodedMsg.msgBody })
            if (decoded) {
              await Node.update({
                id: `420/${event.transaction.from}/${nodeId}`,
                data: {
                  nodeAdmin: decoded?.admins as bigint[],
                  nodeMembers: decoded?.members as bigint[],
                },
              })
            } else {
              return
            }
          } else if (decodedMsg.msgType === BigInt(201)) {
            const decoded = decodePublication201({
              msgBody: decodedMsg.msgBody,
            })
            if (decoded) {
              await Publication.update({
                id: `420/${event.transaction.from}/${schema}/${nodeId}`,
                data: {
                  uri: decoded.uri,
                },
              })
            }
          } else if (decodedMsg.msgType === BigInt(301)) {
            const decoded = decodeChannel301({ msgBody: decodedMsg.msgBody })
            if (decoded) {
              await Channel.update({
                id: `420/${event.transaction.from}/${schema}/${nodeId}`,
                data: {
                  uri: decoded.uri,
                },
              })
            }
          } else if (decodedMsg.msgType === BigInt(302)) {
            console.log(" update message type 302")
            const decoded = decodeChannel302({ msgBody: decodedMsg.msgBody })
            if (decoded) {
              await Item.create({
                id: `420/${event.transaction.from}/${schema}/${nodeId}/${event.transaction.hash}/${event.log.logIndex}`,
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
                },
              })
            }
          }
        }
      }
    }
  }
})
