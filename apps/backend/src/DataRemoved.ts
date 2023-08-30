import { ponder } from "@/generated";
import { schemaMap } from "./decodingSchema";
import { BigNumberish, Network, Nft, NftMetadata } from "alchemy-sdk";
import getNftMetadata from "./hooks/useGetNFTMetadata";
import { pressDataDecoder } from "./decodingSchema/decoders/pressDataDecoder";

ponder.on("Router:DataRemoved", async ({ event, context }) => {
  const { Listing } = context.entities;
  const { press, ids } = event.params;

  // Remove the listings associated with the ids
  for (const id of ids) {
    await Listing.delete({
      id: `${press}-${id}`,
    });
  }
});
