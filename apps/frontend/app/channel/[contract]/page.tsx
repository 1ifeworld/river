import { getChannel } from '../../../gql/requests/getChannel'
import { Hex } from 'viem';
import { Flex } from '@river/design-system';
import { ChannelBanner, ChannelBody} from '../../../components/channel';
import { type Channel, type ListingExtended  } from '../../../types/types';
import { getAddress } from 'viem';


export default async function Channel({
  params,
}: {
  params: { contract: string };
}) {

  const { channels } = await getChannel({
    channel: getAddress(params.contract) as string,
  });
  
  const ipfsToHttps = (ipfsString: string) => {
    if (!ipfsString) return '';
    console.log("IPFS", ipfsString)
    return ipfsString.replace('ipfs://', 'https://ipfs.io/ipfs/');
  };

  const channelBannerInput: Channel = {
    name: channels[0]?.contractUri?.name as string,
    description: channels[0]?.contractUri?.description as string,
    cover: ipfsToHttps(channels[0]?.contractUri?.image as string),
    creator: channels[0]?.createdBy as Hex,
    members: channels[0]?.logicTransmitterMerkleAdmin[0]?.accounts as string[],
  };


  const listingInput: ListingExtended[] = channels[0]?.listings.map(listing => ({
    id: listing.id,
    chainId: BigInt(listing.chainId),
    tokenId: BigInt(listing.tokenId),
    hasTokenId: listing.hasTokenId as boolean,
    createdAt: listing.createdAt as bigint,
    createdBy: listing.createdBy as Hex,
    listingAddress: listing.listingAddress as Hex,
    listingTargetMetadata: listing?.listingTargetMetadata, 
}));

  return (

    <Flex className='flex-col gap-y-[87px]'>
      <ChannelBanner channel={channelBannerInput} />
      <ChannelBody listings={listingInput} />
    </Flex>

  );
}
