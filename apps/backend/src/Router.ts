import { ponder } from "@/generated";

ponder.on("Router:FactoryRegistered", async ({ event, context }) => {
  console.log(event.params);
});

ponder.on("Router:OwnershipTransferred", async ({ event, context }) => {
  console.log(event.params);
});

ponder.on("Router:PressDataUpdated", async ({event, context}) => {
const { TokenStorage } = context.entities;

const pressDataUpdated = await TokenStorage.create({
  id: event.params.sender,
  data:{
    sender: event.params.sender,
    press: event.params.press,
    pointer: event.params.pointer,
  },
})
});