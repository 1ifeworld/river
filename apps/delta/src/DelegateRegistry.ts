import { ponder } from "@/generated";

ponder.on("DelegateRegistry:Delegate", async ({ event, context }) => {
  const { DelegateRegistry } = context.entities;
  const { id, nonce, target, status } = event.params;
  
  await DelegateRegistry.create({
    id: `420/${id}/${nonce}/${target}`,
    data: {
      userId: id,
      transferNonce: nonce,
      target: target,
      status: status
    }
  });
});