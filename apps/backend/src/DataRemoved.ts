import { ponder } from "@/generated";

ponder.on("Router:DataRemoved", async ({ event, context }) => {
  const { timestamp } = event.block;
  // filter added on tuesday sept 26 @ 6:29pm est
  if (timestamp < 1695763671) return
  //  
  const { Listing } = context.entities;
  const { press, ids } = event.params;

  // Remove the listings associated with the ids
  for (const id of ids) {
    await Listing.delete({
      id: `${press}-${id}`,
    });
  }
});
