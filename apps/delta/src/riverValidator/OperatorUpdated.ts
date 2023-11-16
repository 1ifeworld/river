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
