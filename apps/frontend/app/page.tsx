import { Header } from '../components/client';
import { AllChannels } from '../components/channel/AllChannels';
import { getAllChannels } from '../gql/requests/getAllChannels';
import { Stack, Flex } from '@river/design-system';
import { Hex } from 'viem';

export default async function Home() {
  const { channels } = await getAllChannels();

  // const ipfsToHttps = (ipfsString: string) => {
  //   if (!ipfsString) return '';
  //   return ipfsString.replace('ipfs://', 'https://ipfs.io/ipfs/');
  // };

  // TODO JDR: make it work with uri use in QUERY 
  const channelsWithNoName = channels.filter(
    (channel) =>
      channel?.contractUri?.image && channel.contractUri.image.trim() !== ''
  );

  // const channelsContractUriInput: ContractUri[] = channelsWithNoName.map((channel) => ({
  //   id: channel?.id,
  //   name: channel?.contractUri?.name as string,
  //   description: channel?.contractUri?.description as string,
  //   cover: ipfsToHttps(channel?.contractUri?.image as string),
  //   creator: channel?.createdBy as Hex,
  //   members: channel?.logicTransmitterMerkleAdmin[0]?.accounts as string[],
  // }));

  return (
    <>
      <Stack className='items-center my-10'>
        {/* Channel card grid */}
        <Flex className='flex-wrap gap-5 pb-4'>
          {/* <AllChannels channel={channelsContractUriInput} /> */}
        </Flex>
      </Stack>
    </>
  );
}
