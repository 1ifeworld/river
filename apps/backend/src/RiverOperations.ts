  import { ponder } from "@/generated";
  import { schemaMap } from "./decodingSchema";

  ponder.on("Router:DataSent", async ({event, context})=> {
    const { Channel, Listing } = context.entities;
    const { press, schema, response, ids } = event.params;
    
    // Decode event response into dynamic array of new listings
    const newListings = schemaMap[String(schema)](response);
    
    // Lookup press in channel table, if it doesnt exist, create it
    let channel = await Channel.findUnique({ id: press });
    if (!channel) {
      channel = await Channel.create({
        id: press,
      });
    }
    
    // Create a Listing associated with the channel
    for (const [index, newListing] of newListings.entries()) {
      const listing = await Listing.create({
        id: `${press}-${ids[index]}`,
        data: {
          chainId: newListing[index].chainId.toString(),
          tokenId: newListing[index].tokenId.toString(),
          listingAddress: newListing[index].listingAddress,
          hasTokenId: newListing[index].hasTokenId,
          channel: press, 
        },
      });
    }
  });


    // TODO:
    // add second half of crud op that will fetch clean process cache the metadata associated
    // with the listing


  // remove 

  ponder.on("Router:DataRemoved", async ({event, context}) => {
    const { Listing } = context.entities;
    const { press, ids } = event.params;
    
    // Remove the listings associated with the ids
    for (const id of ids) {
      await Listing.delete({
        id: `${press}-${id}`,
      });
    }
  });

  // setupPress ;; pressRegistered

  ponder.on("Router:PressRegistered", async ({event, context}) => {
    const { Router } = context.entities;
  

    const { sender, factory, newPress, newPressData } = event.params;

    await Router.create({
      id: newPress,
      data: {
        sender,
        factory,
        newPress,
        newPressData,
      },
    });
  });


  