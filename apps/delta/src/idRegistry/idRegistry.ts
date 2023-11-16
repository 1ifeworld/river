import { ponder } from '@/generated'

// keep track of every cancelled attempt to transfer

// ponder.on("IdRegistry:Attest" ,  async ({event, context}) => {
//   const {IdRegistry} = context.entities;
//   const {id, attestor} = event.params

//   await IdRegistry.upsert({
//     id: `420/${id}/${attestor}`,
//     create: {
//       userId: id,
//       attestor: attestor,
//     },
//     update : {
//       attestor: attestor
//     }
//   })

// });

// ponder.on("IdRegistry:RevokeAttestation", async ({event, context}) => {
//   const {IdRegistry} = context.entities;
//   const {id, attestor} = event.params

//   await IdRegistry.update({
//     id: `420/${id}/${attestor}`,
//     data: {
//       userId: id,
//       attestor: attestor,
//     }
//   })
// })

// // keep track of every cancelled attempt to transfer

// // keep track of every initiated attempt to transfer
// ponder.on("IdRegistry:TransferInitiated", async ({event, context}) => {
//   const {IdRegistry} = context.entities;
//   const {from, to, id } = event.params

//   await IdRegistry.create({
//     id: `420/${event.transaction.hash}/${from}/${to}/${id}`,
//     data: {
//       from: from,
//       to: to,
//       userId: id,

//     },
//   });
// });

// ponder.on("IdRegistry:TransferCancelled", async ({event, context}) => {
//   const {IdRegistry} = context.entities;
//   const {from, to, id} = event.params

//   await IdRegistry.create({
//     id: `420/${event}/${from}/${to}/${id}`,
//     data: {
//       from: from,
//       to: to,
//       user: String(id),
//     }
//   })

// })

// // update the to field of the ID which is now new owner of ID
// // we've update the to: userId . but we're missing backup

// ponder.on("IdRegistry:TransferComplete", async ({event, context}) => {

//   const {IdRegistry} = context.entities;
//   const {from, to, id} = event.params

//   await IdRegistry.upsert({
//     id: `420/${from}/${to}/${id}`,
//     create: {
//       from: from,
//       to: to,
//       user: String(id),
//         },
//     update: {
//       to: to
//     }
//   })

// })

// should we assume backup is always us? should folks be able to update this
ponder.on('IdRegistry:Register', async ({ event, context }) => {
  const { IdRegistry } = context.entities
  const { to, id, backup, data } = event.params

  // // Retrieve or create a User entity with the given userId
  // let userEntity = await User.findUnique({ id: `RIVER_USER_${id}` });
  // if (!userEntity) {
  //   userEntity = await User.create({
  //     id: `${id}`,
  //     data: {
  //       userId: id,
  //     }
  //   });
  // }

  await IdRegistry.create({
    id: `420/${to}/${id}`,
    data: {
      to: to,
      userId: id,
      backup: backup,
      data: data,
    },
  })
})
// // should we assume backup is always us? should folks be able to update this

// ponder.on("IdRegistry:Register", async ({ event, context }) => {

//   const { IdRegistry } = context.entities;
//   const { to, id, backup, data } = event.params;

//   await IdRegistry.create({
//     id: `420/${to}/${id}`,
//     data: {
//       to: to,
//       userId: id,
//       backup: backup,
//       data: data
//     }
//   });
// });
