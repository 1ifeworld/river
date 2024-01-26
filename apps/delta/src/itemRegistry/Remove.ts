import { ponder } from '@/generated'
import { zeroAddress } from 'viem'

ponder.on('ItemRegistry:Remove', async ({ event, context }) => {
  const { Add, Txn, } = context.db
  const { sender, userId, itemId, channelId } = event.args

  await Add.update({
    id: `${itemId}/${channelId}`,
    data: {
        createdTimestamp: event.block.timestamp,
        createdBy: userId,
        itemId: zeroAddress,
        channelId: zeroAddress
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