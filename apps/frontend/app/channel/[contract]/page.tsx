import { getChannel } from '../../../gql/requests/getChannel';
import { Hex } from 'viem';
import { Flex } from '@river/design-system';
import { ChannelBanner, ChannelBody} from '../../../components/channel';
// import { type Channel, type ListingExtended, type ContractUri, LogicTransmitterMerkleAdmin  } from '../../../types/types';
import { Channel, ContractUri, Listing } from '../../../gql/sdk.generated';

import { getAddress } from 'viem';


export default async function Channel({
  params,
}: {
  params: { contract: string, contractUri: ContractUri };
}) {

  const { channels } = await getChannel({
    channel: getAddress(params.contract) as string,
  });

  const ipfsToHttps = (ipfsString: string) => {
    if (!ipfsString) return '';
    return ipfsString.replace('ipfs://', 'https://ipfs.io/ipfs/');
  };

  return (

    <Flex className='flex-col gap-y-[87px]'>
      <ChannelBanner channels={channels?.[0]} />
      <ChannelBody listings={channels[0]?.listings} />
    </Flex>

  );
}
