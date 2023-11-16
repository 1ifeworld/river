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

// ponder.on("RiverValidatorV1:OperatorUpdated", async ({ event, context }) => {
//   const { RiverValidatorV1 } = context.entities

//   const { operator } = event.params

//   await RiverValidatorV1.create({
//     // chain // validatorAddress // userId
//     id: `${420}/${event.transaction.from}/${operator}`,
//     data: {
//        operator: operator
//       },
//   })
// })
