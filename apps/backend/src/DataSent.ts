import { ponder } from "@/generated";
import { schemaMap } from "./decodingSchema";
import { BigNumberish, Network, Nft, NftMetadata } from "alchemy-sdk";
import getNftMetadata from "./hooks/useGetTokenMetadata";
import { pressDataDecoder } from "./decodingSchema/decoders/pressDataDecoder";

type NFTProcessedLog = {
  pieceName?: string;
  pieceCreator?: string;
  pieceDescription?: string;
  pieceImageURL?: string;
  pieceAnimationURL?: string;
  pieceCreatedDate?: string;
  pieceContentType?: string;
};

function processMetadata(metadata: Nft | NftMetadata): NFTProcessedLog {
  return {
    pieceName: metadata.title,
    pieceCreator: metadata.contract.contractDeployer,
    pieceDescription: metadata.description,
    pieceImageURL: metadata.media[0]?.thumbnail,
    pieceAnimationURL: metadata.contract.raw?.metadata?.animation_url,
    pieceCreatedDate: metadata.contract.deployedBlockNumber,
    pieceContentType: metadata.contract.image?.contentType,
  };
}

ponder.on("Router:DataSent", async ({ event, context }) => {
  const { Channel, Listing, PieceMetadata } = context.entities;
  const { press, schema, response, ids } = event.params;

  // Decode event response into dynamic array of new listings
  const [newListings] = schemaMap[String(schema)](response);

  // Lookup press in channel table, if it doesnt exist, create it
  let channel = await Channel.findUnique({ id: press });
  if (!channel) {
    channel = await Channel.create({
      id: press,
    });
  }

  // Create a Listing associated with the channel
  for (const [index, newListing] of newListings.entries()) {
    const { chainId, tokenId, listingAddress, hasTokenId } = newListing;
    const listingId = `${chainId}/${press}/${ids[index]}`;

    const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_KEY;
    if (!apiKey) {
      throw new Error("ALCHEMY_KEY is not defined");
    }

    // Fetch the target metadata
    const metadata = await getNftMetadata({
      network: 1,
      address: listingAddress,
      tokenId: tokenId as BigNumberish,
      apiKey: apiKey,
    });

    if (!metadata) {
      console.error("Metadata is undefined for listing:", listingId);
      continue;
    }

    // Process the metadata into your own shape
    const processedMetadata = processMetadata(metadata);

    // Check if a PieceMetadata entity with the listingId already exists
    const existingMetadata = await PieceMetadata.findUnique({
      id: listingId,
    });

    // Create a PieceMetadata entity
    if (!existingMetadata) {
      const metadataEntity = await PieceMetadata.create({
        id: listingId,
        data: {
          ...processedMetadata,
        },
      });
    } else {
      console.log("PieceMetadata already exists:", listingId);
    }

    // Create a Listing entity
    const existingListing = await Listing.findUnique({
      id: listingId,
    });

    if (!existingListing) {
      const listing = await Listing.create({
        id: listingId,
        data: {
          chainId: chainId.toString(),
          tokenId: tokenId.toString(),
          listingAddress: listingAddress,
          hasTokenId: hasTokenId,
          channel: press,
          listingTargetMetadata: listingId, // associate the PieceMetadata entity with the Listing entity
        },
      });
    } else {
      console.log("Listing already exists:", listingId);
    }
  }
});
