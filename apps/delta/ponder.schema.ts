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

  UserCounter: p.createTable({
    id: p.string(), // chain + id registry addy
    counter: p.bigint(),
    lastUpdated: p.bigint()
  }),
  User: p.createTable({
    id: p.bigint(),
    timestamp: p.bigint(),
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
    parentPostId: p.string(),
    rid: p.bigint(),
    timestamp: p.bigint(),
    msgType: p.bigint(),
    msgBody: p.hex(),
  }),
  ChannelCounter: p.createTable({
    id: p.string(), // chain+idregistry+"channel"
    counter: p.bigint(),
    lastUpdated: p.bigint()
  }),  
  Channel: p.createTable({
    id: p.string(),
    messageId: p.string().references('Message.id'),
    message: p.one('messageId'),    
    timestamp: p.bigint(),
    createdById: p.bigint().references('User.id'),
    createdBy: p.one('createdById'),
    uri: p.string(),
    name: p.string(),
    description: p.string(),
    roles: p.many("ChannelRoles.channelId"),
    addsCounter: p.bigint(),
    adds: p.many('Adds.channelId'),
  }),
  ChannelRoles: p.createTable({
    id: p.string(),
    timestamp: p.bigint(),
    rid: p.bigint(),
    channelId: p.string().references('Channel.id'),
    channel: p.one('channelId'),
    role: p.bigint()
  }),  
  ItemCounter: p.createTable({
    id: p.string(), // chain+idregistry+"item"
    counter: p.bigint(),
    lastUpdated: p.bigint()
  }),    
  Item: p.createTable({
    id: p.string(),
    messageId: p.string().references('Message.id'),
    message: p.one('messageId'),
    timestamp: p.bigint(),
    createdById: p.bigint().references('User.id'),
    createdBy: p.one('createdById'),
    uri: p.string(),
    adds: p.many('Adds.itemId')
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
    timestamp: p.bigint(),
    addedById: p.bigint().references('User.id'),
    addedBy: p.one('addedById'),
    itemId: p.string().references('Item.id'),
    item: p.one('itemId'),
    channelId: p.string().references('Channel.id'),
    channel: p.one('channelId'),
    channelIndex: p.bigint(),
    removedById: p.bigint().optional(),
    removed: p.boolean().optional()
  })
}))
