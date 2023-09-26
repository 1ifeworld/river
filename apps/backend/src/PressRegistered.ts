import { ponder } from "@/generated";
import { pressDataDecoder } from "./decodingSchema/decoders/pressDataDecoder";
import fetchIPFSData, {IPFSData} from "./utils/fetchIPFSdata";

// pick up new press registered. 
// pick up logs associated event. 
// decode and process arbitrary logs 
// get associated contract uri data 
// create a new Channel entity and store 


ponder.on("Router:PressRegistered", async ({ event, context }) => {
  const { Router, Channel, ContractUri } = context.entities;
  const { timestamp } = event.block;
  // filter added on tuesday sept 26 @ 6:29pm est
  if (timestamp < 1695763671) return
  //  
  const { sender, factory, newPress, newPressData } = event.params;

  // Decode the newPressData
  let contractUri = await pressDataDecoder(newPressData);

  // Check if contractUri is undefined // empty string 
  if (!contractUri) {
    contractUri = "";
  }

  let contractUriData: IPFSData = {
    name: "",
    description: "",
    image: "",
} 

  // Check if contractUri starts with 'ipfs://'
  if (contractUri.startsWith('ipfs://')) {
  // Fetch the contractUri data
   const fetchIPFSresponse = await fetchIPFSData(contractUri)
   if (!!fetchIPFSresponse) {
   contractUriData = fetchIPFSresponse ;
   }
  }


  // Create or update the ContractUri entity.
  // upsert should only be used in dev // in prod this should be create not upsert

  const newContractUri = await ContractUri.upsert({
    id: newPress,
    create: {
      uri: contractUri,
      name: contractUriData.name,
      description: contractUriData.description,
      image: contractUriData.image,
      updatedAt: timestamp,
    },
    update: {
      uri: contractUri,
      name: contractUriData.name,
      description: contractUriData.description,
      image: contractUriData.image,
      updatedAt: timestamp,
    },
  });


  // Create or update the Channel entity.
  // upsert should only be used in dev // in prod this should be create not upsert

    await Channel.upsert({
      id: newPress,
      create: {
        contractUri: newContractUri.id,
        createdAt: timestamp,
        createdBy: sender
      },
      update: {
        contractUri: newContractUri.id,
        createdAt: timestamp,
        createdBy: sender
      },
    });
  
  // Create or update the Router entity. Not currently being used in frontend 
  // upsert should only be used in dev // in prod this should be create not upsert
  await Router.upsert({
    id: newPress,
    create: {
      sender,
      factory,
      newPress,
      newPressData,
      createdAt: timestamp,
      createdBy: sender
    },
    update: {
      sender,
      factory,
      newPress,
      newPressData,
      createdAt: timestamp,
      createdBy: sender
    },
  });

  // Create or update the Channel entity

});
