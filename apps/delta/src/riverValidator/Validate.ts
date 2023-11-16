// import { ponder } from '@/generated'

// ponder.on("RiverValidatorV1:Validate", async ({ event, context }) => {
//   const { RiverValidatorV1 } = context.entities

//   const { id, status } = event.params

//   await RiverValidatorV1.upsert({
//     // chain // validatorAddress // userId
//     id: `${420}/${event.transaction.from}/${id}`,
//     create: {
//         userId: id,
//         status: status
//       },
//    update: {
//         status: status
//   }
//     })
// })

