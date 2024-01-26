import { ponder } from '@/generated'
import { slice, bytesToString, toBytes, decodeFunctionData, Hex, getAddress } from 'viem'
import { itemRegistryABI } from 'scrypt'

ponder.on('ItemRegistry:New', async ({ event, context }) => {
  const {
    User,
    Item,
    Add,
    Txn,
  } = context.db
  const {client} = context
  const { sender, userId, itemId, pointer } = event.args

  const itemInitData = await client.getBytecode({
    address: pointer
  })
  const renderer = slice(itemInitData as Hex, 0, 20)
  const encodedString = slice(itemInitData as Hex, 20)

  await Item.create({
    id: itemId,
    data: {
      createdTimestamp: event.block.timestamp,
      createdBy: userId,
      admins: [userId],
      pointer: pointer,
      renderer: getAddress(renderer),
      dataForUri: encodedString,
      uri: bytesToString(toBytes(encodedString)),    
    }
  })

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