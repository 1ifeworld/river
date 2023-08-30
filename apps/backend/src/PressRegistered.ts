import { ponder } from "@/generated";
import { pressDataDecoder } from "./decodingSchema/decoders/pressDataDecoder";

ponder.on("Router:PressRegistered", async ({ event, context }) => {
  const { Router, Channel } = context.entities;

  const { sender, factory, newPress, newPressData } = event.params;

  // Decode the newPressData
  const contractUri = await pressDataDecoder(newPressData);

  // Create or update the Router entity
  await Router.upsert({
    id: newPress,
    create: {
      sender,
      factory,
      newPress,
      newPressData,
    },
    update: {
      sender,
      factory,
      newPress,
      newPressData,
    },
  });

  // Create or update the Channel entity
  await Channel.upsert({
    id: newPress,
    create: {
      contractUri: contractUri,
    },
    update: {
      contractUri: contractUri,
    },
  });
});
