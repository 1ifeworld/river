import { ponder } from "@/generated";
import { pressDataDecoder } from "./decodingSchema/decoders/pressDataDecoder";
import fetchIPFSData from "./utils/fetchIPFSdata";

ponder.on("Router:PressRegistered", async ({ event, context }) => {
  const { Router, Channel, ContractUri } = context.entities;

  const { sender, factory, newPress, newPressData } = event.params;

  // Decode the newPressData
  const contractUri = await pressDataDecoder(newPressData);

  // Check if contractUri is undefined
  if (!contractUri) {
    return;
  }

  // Check if contractUri starts with 'ipfs://'
  if (!contractUri.startsWith('ipfs://')) {
    return;
  }

  // Fetch the contractUri data
  const contractUriData = await fetchIPFSData(contractUri);
  if (!contractUriData) {
    return;
  }

  // Create or update the ContractUri entity
  let existingContractUri = await ContractUri.findUnique({
    id: newPress,
  });

  if (!existingContractUri) {
    existingContractUri = await ContractUri.create({
      id: newPress,
      data: {
        uri: contractUri,
        ...contractUriData,
      },
    });
  } else {
    existingContractUri = await ContractUri.update({
      id: newPress,
      data: {
        uri: contractUri,
        ...contractUriData,
      },
    });
  }

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
      contractUri: existingContractUri.id,
    },
    update: {
      contractUri: existingContractUri.id,
    },
  });
});
