import { ponder } from "@/generated";
import { schemaMap } from "./decodingSchema";

ponder.on("Router:DataSent", async ({event, context})=> {
  // Define target entities
  const { Channel, Listing } = context.entities;
  // Decode event response into dynamic array of new listings
  const newListings = schemaMap[String(event.params.schema)](event.params.response);
  // Lookup press in channel table, if it doesnt exist, create it
  let channel = await Channel.findUnique({ id: event.params.press });
  if (!channel) {
    channel = await Channel.create({
      id: event.params.press,
    });
  }
  // Create a Listing associated with the channel
  for (const [index, newListing] of newListings.entries()) {
    const listing = await Listing.create({
      id: `${event.params.press}-${event.params.ids[index]}`,
      data: {
        chainId: newListing[index].chainId.toString(),
        tokenId: newListing[index].tokenId.toString(),
        listingAddress: newListing[index].listingAddress,
        hasTokenId: newListing[index].hasTokenId,
        channel: event.params.press, 
      },
    });
  }
});

// remove 

// setupPress ;; pressRegistered

// Logic Merkle Root Set  // account w.e 