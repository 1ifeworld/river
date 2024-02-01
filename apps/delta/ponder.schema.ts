import { createSchema } from '@ponder/core'

export default createSchema((p) => ({
  /* ************************************************

                        ID REGISTRY

  ************************************************ */

  User: p.createTable({
    id: p.bigint(),
    userId: p.bigint(),
    to: p.hex(),
    recovery: p.hex(),
    from: p.hex(),
  }),

  /* ************************************************

                        POST GATEWAY

  ************************************************ */

  // struct Post {
  //   address signer;
  //   Message message;
  //   uint16 hashType;
  //   bytes32 hash;
  //   uint16 sigType;
  //   bytes sig;
  // }    

  // struct Message {
  //   uint256 rid; // could use sig here instead? rid seems fine tho
  //   uint256 timestamp;
  //   MessageTypes msgType;			
  //   bytes contents;				
  // }                         
  
    //   channelId: p.bigint().references('Channel.id').optional(),
  //   channel: p.one('channelId'),

  Txn: p.createTable({
    id: p.hex(),
  }),
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
    rid: p.bigint(),
    timestamp: p.bigint(),
    msgType: p.bigint(),
    msgBody: p.hex(),
  }),
  // ChannelCounter: p.createTable({
  //   id: p.string(),
  //   counter: p.bigint(),
  //   lastUpdated: p.bigint(),
  // }),
  // Channel: p.createTable({
  //   id: p.string(),
  //   createdTimestamp: p.bigint(),
  //   createdBy: p.bigint().references('User.id'),
  //   uri: p.string(),
  //   admins: p.bigint().list(), // UPDATE to reference User
  //   members: p.bigint().list(), // UPDATE to reference User
  //   // references: p.many('Reference.channelId'),
  //   // mentions: p.many("Reference.chanRefId")
  // }),
  // PublicationCounter: p.createTable({
  //   id: p.string(),
  //   counter: p.bigint(),
  //   lastUpdated: p.bigint(),
  // }),
  // Publication: p.createTable({
  //   id: p.bigint(),
  //   createdTimestamp: p.bigint(),
  //   createdBy: p.bigint().references('User.id'),
  //   uri: p.string(),
  //   mentions: p.many("Reference.pubRefId")
  // }),
  // ReferenceCounter: p.createTable({
  //   id: p.string(),
  //   counter: p.bigint(),
  //   lastUpdated: p.bigint(),
  // }),
  // Reference: p.createTable({
  //   id: p.bigint(),
  //   createdTimestamp: p.bigint(),
  //   createdBy: p.bigint().references('User.id'),
  //   channelId: p.bigint().references('Channel.id').optional(),
  //   channel: p.one('channelId'),
  //   pubRefId: p.bigint().references('Publication.id').optional(),
  //   pubRef: p.one('pubRefId'),
  //   chanRefId: p.bigint().references('Channel.id').optional(),
  //   chanRef: p.one('chanRefId'),
  // }),
}))
