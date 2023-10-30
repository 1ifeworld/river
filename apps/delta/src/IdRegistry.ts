import { ponder } from "@/generated";
import { operator } from "@/constants"

/*
  NOTE: 

  Be aware that we are relying on the fact that only register calls from
  the operator are to be considered valid, and that all calls fromm the operator
  will be registering ids to LightAccount proxies
    
  If this logic is ever invalid, we will not have an accurate read on what
  certain custody addresses are
*/

ponder.on("IdRegistry:Register", async ({ event, context }) => {
  
  const { IdRegistry } = context.entities;
  const { to, id, backup, data } = event.params;

  await IdRegistry.create({
    id: `420/${to}/${id}`,
    data: {
      to: to, 
      userId: id, 
      backup: backup,
      data: data
    }
  });
});


// // Handle Attest event
// ponder.on("IdRegistry:Attest", async ({ event, context }) => {
//   const { IDRegistry, Attest } = context.entities;
//   const { id, attestor } = event.params;

//   const attestEvent = await Attest.create({
//     id: `${id}`,
//     data: {
//       rid: id,
//       attestor: attestor,
//     },
//   });

//   await IDRegistry.create({
//     id: `${id}`,
//     data: {
//       rid: id,
//       attestEvent: attestEvent.id,
//     },
//   });
// });



// // Handle RevokeAttestation event
// // Handle RevokeAttestation event
// ponder.on("IdRegistry:RevokeAttestation", async ({ event, context }) => {
//   const { IDRegistry, RevokeAttestation } = context.entities;
//   const { id, attestor } = event.params;

//   const revokeAttestationEvent = await RevokeAttestation.create({
//     id: `${id}`,
//     data: {
//       rid: id,
//       attestor: attestor,
//     },
//   });

//   await IDRegistry.create({
//     id: `${id}`,
//     data: {
//       rid: id,
//       revokeAttestationEvent: revokeAttestationEvent.id,
//     },
//   });
// });

// // Handle TransferCancelled event
// ponder.on("IdRegistry:TransferCancelled", async ({ event, context }) => {
//   const { IDRegistry, TransferCancelled } = context.entities;
//   const { from, to, id } = event.params;

//   const transferCancelledEvent = await TransferCancelled.create({
//     id: `${id}`,
//     data: {
//       from: from,
//       to: to,
//       rid: id,
//     },
//   });

//   await IDRegistry.create({
//     id: `${id}`,
//     data: {
//       rid: id,
//       transferCancelledEvent: transferCancelledEvent.id,
//     },
//   });
// });


// // Handle TransferComplete event
// ponder.on("IdRegistry:TransferComplete", async ({ event, context }) => {
//   const { IDRegistry, TransferComplete } = context.entities;
//   const { from, to, id } = event.params;

//   const transferCompleteEvent = await TransferComplete.create({
//     id: `${id}`,
//     data: {
//       from: from,
//       to: to,
//       rid: id,
//     },
//   });

//   await IDRegistry.create({
//     id: `${id}`,
//     data: {
//       rid: id,
//       transferCompleteEvent: transferCompleteEvent.id,
//     },
//   });
// });


// // Handle TransferInitiated event
// ponder.on("IdRegistry:TransferInitiated", async ({ event, context }) => {
//   const { IDRegistry, TransferInitiated } = context.entities;
//   const { from, to, id } = event.params;

//   const transferInitiatedEvent = await TransferInitiated.create({
//     id: `${id}`,
//     data: {
//       from: from,
//       to: to,
//       rid: id,
//     },
//   });

//   await IDRegistry.create({
//     id: `${id}`,
//     data: {
//       rid: id,
//       transferInitiatedEvent: transferInitiatedEvent.id,
//     },
//   });
// });