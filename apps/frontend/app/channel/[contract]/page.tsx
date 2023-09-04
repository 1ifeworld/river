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

  console.log(channels)

  const ipfsToHttps = (ipfsString: string) => {
    if (!ipfsString) return "";
    return ipfsString.replace('ipfs://', 'https://ipfs.io/ipfs/');
  }

  // const makeListingsChronological = (listings: any) => {
  //   take in listings array and re order the array based on 
  //   createdAt timestamp value for each listing
  //   use this function the channelBodyInput
  // }

  const channelBannerInput: Channel = {
    name: channels[0]?.contractUri?.name as string,
    description: channels[0]?.contractUri?.description as string,
    cover: ipfsToHttps(channels[0]?.contractUri?.image as string),
    creator: channels[0]?.createdBy as string,
    members: channels[0]?.logicTransmitterMerkleAdmin[0]?.accounts as string[]
  }

  return (
    <Flex className='flex-col gap-y-[87px]'>
      <ChannelBanner channel={channelBannerInput}/>
      <ChannelBody listings={channels[0]?.listings} />
    </Flex>
  );
}