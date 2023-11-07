import { ponder } from "@/generated";

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