import { getChannel } from "../../../../gql/requests/getChannel";
import { Hex } from "viem";
import { Flex } from "@river/design-system";
import { ChannelBanner, ChannelBody } from "../../../../components/channel";
import { type Channel, type ListingExtended } from "../../../../types/types";
import { getAddress } from "viem";
import { Sidebar } from '../../../../components/client';

export default async function Channel({
  params,
}: {
  params: { contract: string };
}) {
  const { channels } = await getChannel({
    channel: getAddress(params.contract) as string,
  });

  const ipfsToHttps = (ipfsString: string) => {
    if (!ipfsString) return "";
    return ipfsString.replace("ipfs://", "https://ipfs.io/ipfs/");
  };

  const channelBannerInput: Channel = {
    id: channels[0]?.id,
    name: channels[0]?.contractUri?.name as string,
    description: channels[0]?.contractUri?.description as string,
    cover: ipfsToHttps(channels[0]?.contractUri?.image as string),
    creator: channels[0]?.createdBy as Hex,
    members: channels[0]?.logicTransmitterMerkleAdmin[0]?.accounts as string[],
  };

  const listingInput: ListingExtended[] = channels[0]?.listings.map(
    (listing) => ({
      id: listing.id,
      chainId: BigInt(listing.chainId),
      tokenId: BigInt(listing.tokenId),
      hasTokenId: listing.hasTokenId as boolean,
      createdAt: listing.createdAt as bigint,
      createdBy: listing.createdBy as Hex,
      listingAddress: listing.listingAddress as Hex,
      listingTargetMetadata: listing?.listingTargetMetadata
        ? {
            id: listing.listingTargetMetadata.id,
            pieceName: listing.listingTargetMetadata.pieceName || "",
            pieceCreator: listing.listingTargetMetadata.pieceCreator as Hex,
            pieceDescription:
              listing.listingTargetMetadata.pieceDescription || "",
            pieceImageURL: listing.listingTargetMetadata.pieceImageURL || "",
            pieceAnimationURL:
              listing.listingTargetMetadata.pieceAnimationURL || "",
            pieceCreatedDate:
              listing.listingTargetMetadata.pieceCreatedDate || "",
            pieceContentType:
              listing.listingTargetMetadata.pieceContentType || "",
          }
        : null,
    })
  );

  return (
    <Flex className="flex-col gap-y-[87px]">
      <ChannelBanner channel={channelBannerInput} />
      <ChannelBody listings={listingInput} />
    </Flex>      
  );
}
