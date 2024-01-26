import { ponder } from '@/generated'
import { slice, bytesToString, toBytes, decodeFunctionData, Hex, getAddress } from 'viem'
import { roleBasedAccessABI } from 'scrypt'

ponder.on('RoleBasedAccess:RolesSet', async ({ event, context }) => {
  const {
    User,
    Channel,
    RoleBasedAccess,
    Txn,
  } = context.db

  const { sender, userId, userIds, channelHash, roles } = event.args

  console.log

  // Match roles with targetUserIds
  const members: bigint[] = []
  const admins: bigint[] = []
  roles.forEach((role, index) => {
    const userId = userIds[index];
    if (role === 1) {
      members.push(userId);
    } else if (role === 2) {
      admins.push(userId);
    }
  });  

  await RoleBasedAccess.create({
    id: `${event.log.address}/${sender}/${channelHash}`,
    data: {
        createdTimestamp: event.block.timestamp,
        createdBy: userId,
        admins: admins,
        members: members
    }
  })

//   await Channel.create({
//     id: channelId,
//     data: {
//       createdTimestamp: event.block.timestamp,
//       createdBy: userId,
//       logic: logic,
//       access: `${logic}/${event.transaction.to}/${channelId}`,
//       pointer: pointer,
//       renderer: getAddress(renderer),
//       dataForUri: encodedString,    
//       uri: bytesToString(toBytes(encodedString))
//     }
//   })

  // record every transaction that has entered the crud cycle
  const txnReceipt = await Txn.findUnique({ id: event.transaction.hash })
  if (!txnReceipt) {
    await Txn.create({ id: event.transaction.hash })
    console.log(
      'processing complete. processed txn hash: ',
      event.transaction.hash,
    )
  }
})