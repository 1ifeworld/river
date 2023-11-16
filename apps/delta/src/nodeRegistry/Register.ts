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
  generateChannelHash
} from 'scrypt'

// register
ponder.on('NodeRegistry:Register', async ({ event, context }) => {
  const { Node, Message, Publication, Channel, Item } = context.entities

  const { sender, userId, schema, nodeId, messages } = event.params

  console.log(`Node $${nodeId} Registered`)
  const validUser = true

  // Fetch the validation status for the user
  // const validationRecord = await RiverValidatorV1.findUnique({
  // id: `${nodeRegistryChain}/${event.transaction.from}/${userId}`
  // });

  // // Check if user is validated
  // const isValidUser = validationRecord && validationRecord.status;

  // Check if user is valid
  // if (isValidUser) {

  if (validUser) {
    // Create valid node ids regardless if init msgs are valid

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

    // Well need to update this to something like:
    // -- if the first message being sent is NOT a VALID 100 level access message
    // -- then dont enter the processing loop everythign
    // There is also an issue that all emssages downstream of the 100 level message
    // -- have to preform access checks because techicanlly the initializing 100 message
    // -- could have set admin/member params that dont allow the userId to
    // -- process the message they are trying to
    console.log('register messages.length', messages.length)
    for (let i = 0; i < messages.length; ++i) {
      // decode msg. will be null if invalid data, so add logic check after
      const decodedMsg = decodeMessage000({ encodedMsg: messages[i] })
      // check if decodedMsg was null
      if (decodedMsg && isValidMessageId(decodedMsg.msgType)) {
        // record every properly decoded msg
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
        // process msgBody depending on msgType
        if (decodedMsg.msgType === BigInt(101)) {
          // attempt to decode access control body
          const decoded = decodeAccess101({ msgBody: decodedMsg.msgBody })
          // if successful, enter crud logic, if not exit
          if (decoded) {
            await Node.update({
              id: `${nodeRegistryChain}/${event.transaction.to}/${nodeId}`,
              data: {
                nodeAdmin: decoded?.admins as bigint[],
                nodeMembers: decoded?.members as bigint[],
              },
            })
          } else {
            // this exists the entire crud loop if no access controll set
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
                  nodeId: nodeId
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
            // create channel if it doesnt already exist by this point
            //      it might already exist, but if it does, we dont want to update the uri
            await Channel.upsert({
              id: `${nodeRegistryChain}/${event.transaction.to}/${schema}/${nodeId}`,
              create: {
                hashId: generateChannelHash({
                  chainId: nodeRegistryChain,
                  nodeRegistryAddress: event.transaction.to as Hex,
                  schema: schema,
                  nodeId: nodeId
                }),
              },
              update: {},
            })
            // create item and associate it with the parent
            console.log('Decoded channel', decoded)

            await Item.create({
              id: `${nodeRegistryChain}/${event.transaction.to}/${schema}/${nodeId}/${event.transaction.hash}/${event.log.logIndex}`,
              data: {
                chainId: decoded.chainId,
                targetId: decoded.id,
                target: decoded.pointer,
                userId: userId,
                hasId: decoded.hasId,
                channel: `${nodeRegistryChain}/${event.transaction.from}/${schema}/${nodeId}`,
              },
            })
          }
        }
      }
    }
  }
})