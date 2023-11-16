import { ponder } from '@/generated'

ponder.on('IdRegistry:TransferInitiated', async ({ event, context }) => {
  const { IdRegistry } = context.entities
  const { from, to, id } = event.params

  await IdRegistry.create({
    id: `420/${event.transaction.hash}/${from}/${to}/${id}`,
    data: {
      from: from,
      to: to,
      userId: id,
    },
  })
})
