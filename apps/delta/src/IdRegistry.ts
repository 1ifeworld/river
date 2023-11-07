import { ponder } from "@/generated";

ponder.on("IdRegistry:Attest", async ({event, context}) => {
  const {IdRegistry} = context.entities;
  const {id, attestor} = event.params

  await IdRegistry.create({
    id: `420/${id}/${attestor}`,
    data: {
      userId: id,
      attestor: attestor,
    }
  })

});

ponder.on("IdRegistry:RevokeAttestation", async ({event, context}) => {
  const {IdRegistry} = context.entities;
  const {id, attestor} = event.params

  await IdRegistry.create({
    id: `420/${id}/${attestor}`,
    data: {
      userId: id,
      attestor: attestor,
    }
  })

})

ponder.on("IdRegistry:TransferCancelled", async ({event, context}) => {
  const {IdRegistry} = context.entities;
  const {from, to, id} = event.params

  await IdRegistry.create({
    id: `420/${from}/${to}/${id}`,
    data: {
      from: from,
      to: to,
      userId: id,
    }
  })

})

ponder.on("IdRegistry:TransferComplete", async ({event, context}) => {

  const {IdRegistry} = context.entities;
  const {from, to, id} = event.params

  await IdRegistry.create({
    id: `420/${from}/${to}/${id}`,
    data: {
      from: from,
      to: to,
      userId: id,
    }
  })

})

ponder.on("IdRegistry:TransferInitiated", async ({event, context}) => {
  const {IdRegistry} = context.entities;
  const {from, to, id} = event.params

  await IdRegistry.create({
    id: `420/${from}/${to}/${id}`,
    data: {
      from: from,
      to: to,
      userId: id,
    }
  })

})


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