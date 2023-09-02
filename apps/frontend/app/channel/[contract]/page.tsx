import { getChannel } from '../../../gql/requests/getChannel';
import { Flex } from '@river/design-system';
import { ChannelBanner, ChannelBody } from '../../../components/channel';
import { type Channel } from '../../../components/client';
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
    if (!ipfsString) return "";
    return ipfsString.replace('ipfs://', 'https://ipfs.io/ipfs/');
  }

  const channelBannerInput: Channel = {
    name: channels[0]?.contractUri?.name as string,
    description: channels[0]?.contractUri?.description as string,
    cover: ipfsToHttps(channels[0]?.contractUri?.image as string),
    /* Commented out because of issue with accessing createdBy in graphql */
    // creator: channels[0]?.createdBy as string,
    creator: "0x153D2A196dc8f1F6b9Aa87241864B3e4d4FEc170",
    members: channels[0]?.logicTransmitterMerkleAdmin[0]?.accounts as string[]
  }

  return (
    <Flex className='flex-col gap-y-[87px]'>
      <ChannelBanner channel={channelBannerInput}/>
      <ChannelBody listings={channels[0]?.listings} />
    </Flex>
  );
}