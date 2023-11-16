import { ponder } from '@/generated'

ponder.on('IdRegistry:TransferCancelled', async ({ event, context }) => {
  const { IdRegistry } = context.entities
  const { from, to, id } = event.params

  await IdRegistry.create({
    id: `420/${event}/${from}/${to}/${id}`,
    data: {
      from: from,
      to: to,
      user: String(id),
    },
  })
})
