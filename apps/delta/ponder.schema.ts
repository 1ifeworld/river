import { createSchema } from '@ponder/core'

export default createSchema((p) => ({

  /*
      GENERIC
  */

  Txn: p.createTable({
    id: p.hex(),
  }),

  /*
      ID REGISTRY
  */

  User: p.createTable({
    id: p.bigint(),
    userId: p.bigint(),
    to: p.hex(),
    recovery: p.hex(),
    from: p.hex(),
  }),

  /*
      POST GATEWAY
  */

  Post: p.createTable({
    id: p.string(),
    parentBlock: p.string(),
    relayer: p.hex(),
    signer: p.hex(),
    messageId: p.string().references('Message.id'),
    message: p.one('messageId'),
    hashType: p.bigint(),
    hash: p.hex(),
    sigType: p.bigint(),
    sig: p.hex()
  }),
  Message: p.createTable({
    id: p.string(),
    rid: p.bigint(),
    timestamp: p.bigint(),
    msgType: p.bigint(),
    msgBody: p.hex(),
  }),
  Channel: p.createTable({
    id: p.string(),
    messageId: p.string().references('Message.id'),
    message: p.one('messageId'),    
    uri: p.string(),
    name: p.string(),
    description: p.string(),
    roles: p.many("ChannelRoles.channelId")
  }),
  ChannelRoles: p.createTable({
    id: p.string(),
    rid: p.bigint(),
    channelId: p.string().references('Channel.id'),
    channel: p.one('channelId'),
    role: p.bigint()
  }),  
  Item: p.createTable({
    id: p.string(),
    messageId: p.string().references('Message.id'),
    message: p.one('messageId'),
    uri: p.string(),
  }),
  ItemRoles: p.createTable({
    id: p.string(),
    rid: p.bigint(),
    itemId: p.string().references('Item.id'),
    item: p.one('itemId'),
    role: p.bigint()
  }), 
  Adds: p.createTable({
    id: p.string(),
    messageId: p.string().references('Message.id'),
    message: p.one('messageId'),
    itemId: p.string().references('Item.id'),
    itemm: p.one('itemId'),
    channelId: p.string().references('Channel.id'),
    channel: p.one('channelId')
  })
}))
