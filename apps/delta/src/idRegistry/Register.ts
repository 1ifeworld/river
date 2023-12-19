import { ponder } from '@/generated'

// should we assume backup is always us? should folks be able to update this
ponder.on('IdRegistry:Register', async ({ event, context }) => {
  const {
    // IdRegistry,
    User,
    Txn
  } = context.db
  const { to, id, backup, data } = event.args

  // console.log("id registry address: ", event.transaction.to)
  // console.log("register event -- id: ", id)
  // console.log("register event -- to: ", to)
  // console.log("register event -- backup: ", backup)

  await User.create({
    id: id,
    data: {
      userId: id,
      to: to,
      backup: backup,
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

  // await IdRegistry.create({
  //   id: `420/${to}/${id}`,
  //   data: {
  //     to: to,
  //     userId: id,
  //     backup: backup,
  //     data: data,
  //   },
  // })
})
