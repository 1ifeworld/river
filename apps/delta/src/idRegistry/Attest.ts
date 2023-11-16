import { ponder } from '@/generated';

ponder.on("IdRegistry:Attest", async ({ event, context }) => {
  const { IdRegistry } = context.entities;
  const { id, attestor } = event.params;

  await IdRegistry.upsert({
    id: `420/${id}/${attestor}`,
    create: {
      userId: id,
      attestor: attestor,
    },
    update: {
      attestor: attestor
    }
  });
});
