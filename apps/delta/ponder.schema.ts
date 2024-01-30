import { createSchema } from '@ponder/core'

export default createSchema((p) => ({
  /* ************************************************

                        ID REGISTRY

  ************************************************ */

  User: p.createTable({
    id: p.bigint(),
    userId: p.bigint(),
    to: p.bytes(),
    backup: p.bytes(),
    from: p.bytes(),
  }),

  /* ************************************************

                        POST GATEWAY

  ************************************************ */

  Txn: p.createTable({
    id: p.bytes(),
  }),
  PostCounter: p.createTable({
    id: p.string(),
    counter: p.bigint(),
    lastUpdated: p.bigint(),
  }),
  Post: p.createTable({
    id: p.string(),
    timestamp: p.bigint(),
    relayer: p.bytes(),
    data: p.bytes(),
    userId: p.bigint(),
    hashType: p.bigint(),
    hash: p.bytes(),
    sigType: p.bigint(),
    sig: p.bytes(),
    version: p.bigint(),
    expiration: p.bigint(),
    messageArray: p.bytes().list(),
  }),
  Message: p.createTable({
    id: p.string(),
    msgType: p.bigint(),
    msgBody: p.bytes(),
  }),
  ChannelCounter: p.createTable({
    id: p.string(),
    counter: p.bigint(),
    lastUpdated: p.bigint(),
  }),
  Channel: p.createTable({
    id: p.string(),
    createdTimestamp: p.bigint(),
    createdBy: p.bigint().references('User.id'),
    uri: p.string(),
    admins: p.bigint().list(), // UPDATE to reference User
    members: p.bigint().list(), // UPDATE to reference User
    // references: p.many('Reference.channelId'),
    // mentions: p.many("Reference.chanRefId")
  }),
  PublicationCounter: p.createTable({
    id: p.string(),
    counter: p.bigint(),
    lastUpdated: p.bigint(),
  }),
  Publication: p.createTable({
    id: p.bigint(),
    createdTimestamp: p.bigint(),
    createdBy: p.bigint().references('User.id'),
    uri: p.string(),
    // mentions: p.many("Reference.pubRefId")
  }),
  // ReferenceCounter: p.createTable({
  //   id: p.string(),
  //   counter: p.bigint(),
  //   lastUpdated: p.bigint(),
  // }),
  // Reference: p.createTable({
  //   id: p.bigint(),
  //   createdTimestamp: p.bigint(),
  //   createdBy: p.bigint().references('User.id'),
  //   channelId: p.string().references('Channel.id').optional(),
  //   channel: p.one('channelId'),
  //   pubRefId: p.bigint().references('Publication.id').optional(),
  //   pubRef: p.one('pubRefId'),
  //   chanRefId: p.string().references('Channel.id').optional(),
  //   chanRef: p.one('chanRefId'),
  // }),
}))
