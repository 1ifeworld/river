import { ponder } from "@/generated";
import { schemaMap } from "./decodingSchema";
import { BigNumberish } from "alchemy-sdk";
import getMetadata from "./fetch/getMetadata";

type NFTProcessedLog = {
  pieceName?: string;
  pieceCreator?: string;
  pieceDescription?: string;
  pieceThumbnail?: string;
  pieceFullRes?: string;
  pieceAnimationURL?: string;
  pieceCreatedDate?: string;
  pieceContentType?: string;
};

type AlchemyV3GetNFTMetadata = {
  name: string;
  description: string;
  image: {
    thumbnailUrl: string;
    contentType: string;
    cachedUrl: string;
  };
  raw: {
    metadata: {
      animation_url: string;
    };
  };
  contract: {
    contractDeployer: string;
    deployedBlockNumber: string;
  };
};

function processMetadata(metadata: AlchemyV3GetNFTMetadata): NFTProcessedLog {
  return {
    pieceName: metadata.name,
    pieceCreator: metadata.contract.contractDeployer,
    pieceDescription: metadata.description,
    pieceThumbnail: metadata.image?.thumbnailUrl,
    pieceFullRes: metadata.image?.cachedUrl,
    pieceAnimationURL: metadata.raw?.metadata?.animation_url,
    pieceCreatedDate: metadata.contract.deployedBlockNumber,
    pieceContentType: metadata.image?.contentType,
  };
}

ponder.on("Router:DataSent", async ({ event, context }) => {
  const { Channel, Listing, PieceMetadata } = context.entities;
  const { timestamp } = event.block;
  const { press, schema, response, ids, sender } = event.params;

  // Decode event response into dynamic array of new listings
  const [newListings] = schemaMap[String(schema)](response);

  const chainWhereChannelsLiveOn: number = 1; // this is supposed to be 420 op goerli right now. export from constant folder 

  // Create a Listing associated with the channel
  for (const [index, newListing] of newListings.entries()) {
    const { chainId, tokenId, listingAddress, hasTokenId } = newListing;
    // listing ID is unique to listings adding to channels
    const listingId = `${chainWhereChannelsLiveOn}/${press}/${ids[index]};`
    // unique to token metadata that we're looking up
    const metatdataId = `${chainId}/${listingAddress}/${tokenId}/${hasTokenId};`

    // Check if a PieceMetadata entity with the metadataId already exists
    const existingMetadata = await PieceMetadata.findUnique({
      id: metatdataId,
    });

    // Create a PieceMetadata entity
    if (!existingMetadata) {
      try {
        const metadata: AlchemyV3GetNFTMetadata = await getMetadata({
          network: chainId,
          address: listingAddress,
          tokenId: tokenId as BigNumberish,
        });

        if (metadata) {
          // convert alchemy v3 return into our opinionated processed nft metadata scheme
          const processedMetadata = processMetadata(metadata);
          // create metadata object into our pieceMetadata table
          await PieceMetadata.create({
            id: metatdataId,
            data: {
              ...processedMetadata,
            },
          });
        } else {
          console.error("Metadata is undefined.");
        }
      } catch (error) {
        console.error("Error in getMetadata call. The River flows.", error);
      }

      // Check if listing table entry for ListingID exists.
      // we know it doesnt exist because its being created. but this is a dev environment fix to prevent unique ID errors
      const existingListing = await Listing.findUnique({
        id: listingId,
      });
      // if listing doesnt exist. create listing entity and associate it with metadata
      if (!existingListing) {
        const listing = await Listing.create({
          id: listingId,
          data: {
            chainId: chainId.toString(),
            tokenId: tokenId.toString(),
            listingAddress: listingAddress,
            hasTokenId: hasTokenId,
            createdAt: timestamp,
            createdBy: sender,
            channel: press,
            listingTargetMetadata: metatdataId, // associate the PieceMetadata entity with the Listing entity
          },
        });
      }
    }
  }
});
