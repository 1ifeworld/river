import { ponder } from "@/generated";

ponder.on("Router:FactoryRegistered", async ({ event, context }) => {
  console.log(event.params);
});

ponder.on("Router:OwnershipTransferred", async ({ event, context }) => {
  console.log(event.params);
});
