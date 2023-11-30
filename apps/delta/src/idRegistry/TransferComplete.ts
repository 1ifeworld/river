// import { ponder } from '@/generated'

// ponder.on('IdRegistry:TransferComplete', async ({ event, context }) => {
//   const { IdRegistry } = context.entities
//   const { from, to, id } = event.params

//   await IdRegistry.upsert({
//     id: `420/${from}/${to}/${id}`,
//     create: {
//       from: from,
//       to: to,
//       user: String(id),
//     },
//     update: {
//       to: to,
//     },
//   })
// })
