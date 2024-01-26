import { createSchema } from '@ponder/core'


export default createSchema((p) => ({

  /* ************************************************

                        GENERIC

  ************************************************ */  

  Txn: p.createTable({
    id: p.bytes(),
  }),

  /* ************************************************

                        ID REGISTRY

  ************************************************ */

  User: p.createTable({
    id: p.bigint(),
    userId: p.bigint(),
    to: p.bytes(),
    recovery: p.bytes(),
    from: p.bytes(),
  }),

  /* ************************************************

                        CHANNEL REGISTRY

  ************************************************ */

  ChannelCounter: p.createTable({
    id: p.string(),
    counter: p.bigint(),
    lastUpdatedTimestamp: p.bigint(),
  }),  

  Channel: p.createTable({
    id: p.bytes(),
    createdTimestamp: p.bigint(),
    createdBy: p.bigint().references('User.id'),
    logic: p.bytes(),
    pointer: p.bytes(),
    renderer: p.bytes(),
    dataForUri: p.bytes(),
    uri: p.string(),
    accessId: p.string().references('RoleBasedAccess.id'),
    access: p.one("accessId"),
    adds: p.many('Add.channelId')
    // items: p.many('Item.channelId')
  }),

  /* ************************************************

                        ITEM REGISTRY

  ************************************************ */

  Item: p.createTable({
    id: p.bytes(),
    createdTimestamp: p.bigint(),
    createdBy: p.bigint().references('User.id'),
    pointer: p.bytes(),
    renderer: p.bytes(),
    dataForUri: p.bytes(),
    uri: p.string(),
    admins: p.bigint().list(),
    adds: p.many('Add.itemId')
  }),            
  
  Add: p.createTable({
    // item/channel
    id: p.string(),
    createdTimestamp: p.bigint(),
    createdBy: p.bigint().references('User.id'),
    itemId: p.bytes().references('Item.id'),
    item: p.one("itemId"),
    channelId: p.bytes().references('Channel.id'),
    channel: p.one("channelId")
  }),

  /* ************************************************

                    ROLE BASED ACCESS

  ************************************************ */          

  RoleBasedAccess: p.createTable({
    // logic/target/channelHash
    id: p.string(),                    // sender/target address
    createdTimestamp: p.bigint(),
    createdBy: p.bigint().references('User.id'),
    admins: p.bigint().list(),
    members: p.bigint().list()
  }),
}))
