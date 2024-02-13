import { ponder } from '@/generated'

ponder.on('IdRegistry:Register', async ({ event, context }) => {
  const {
    User,
    UserCounter,
    Txn,
  } = context.db
  const { to, id, recovery } = event.args  

  const newUser = await User.create({
    id: id,
    data: {
      timestamp: event.block.timestamp,
      userId: id,
      to: to,
      recovery: recovery,
      from: event.transaction.from,
    },
  })

  await UserCounter.upsert({
    id: `${context.network.chainId}/${event.transaction.to}`,
    create: {
      counter: BigInt(1),
      lastUpdated: event.block.timestamp
    },
    update: ({ current }) => ({
      counter: (current.counter as bigint) + BigInt(1), 
      lastUpdated: event.block.timestamp      
    })
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
