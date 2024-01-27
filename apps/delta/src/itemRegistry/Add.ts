import { ponder } from '@/generated'

ponder.on('ItemRegistry:Add', async ({ event, context }) => {
  const { Add, Txn, } = context.db
  const { sender, userId, itemId, channelId } = event.args

  await Add.create({
    // TODO: add a counter before itemId + channelId
    id: `${itemId}/${channelId}`,
    data: {
        createdTimestamp: event.block.timestamp,
        createdBy: userId,
        itemId: itemId,
        channelId: channelId
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