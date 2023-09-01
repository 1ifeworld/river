import { getChannel } from '../../../gql/requests/getChannel';
import { Flex } from '@river/design-system';
import { ChannelBanner, ChannelBody } from '../../../components/channel';
import { type Channel } from '../../../components/client';

export const dynamic = 'force-dynamic'

export default async function Channel({
  params,
}: {
  params: { contract: string };
}) {

  const { channels } = await getChannel({
    channel: params.contract,
  });  

  const channelToRender: Channel = {
    name: "Example Channel Name",
    description: "Example channel description",
    cover: "https://ipfs.io/ipfs/bafybeihax3e3suai6qrnjrgletfaqfzriziokl7zozrq3nh42df7u74jyu",
    creator: "0x153D2A196dc8f1F6b9Aa87241864B3e4d4FEc170"
  }

  return (
    <Flex className='flex-col gap-y-[87px]'>
      <ChannelBanner channel={channelToRender}/>
      <ChannelBody listings={channels[0].listings} />
    </Flex>
  );
}
