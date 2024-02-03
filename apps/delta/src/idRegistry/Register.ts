import { ponder } from '@/generated'

ponder.on('IdRegistry:Register', async ({ event, context }) => {
  const {
    User,
    Txn,
  } = context.db
  const { to, id, recovery } = event.args  

  const user = await User.create({
    id: id,
    data: {
      userId: id,
      to: to,
      recovery: recovery,
      from: event.transaction.from,
    },
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
