import { ponder } from '@/generated';

ponder.on("IdRegistry:RevokeAttestation", async ({ event, context }) => {
  const { IdRegistry } = context.entities;
  const { id, attestor } = event.params;

  await IdRegistry.update({
    id: `420/${id}/${attestor}`,
    data: {
      userId: id,
      attestor: attestor,
    }
  });
});
