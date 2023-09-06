import { Header, ChannelCard } from '../components/client';
import { Flex, Stack } from '@river/design-system';
import { type Channel } from '../types/types';

const sampleChannelData: Channel = {
  name: 'Channel',
  creator: '0xbC68dee71fd19C6eb4028F98F3C3aB62aAD6FeF3',
  members: ['junghwan.eth', 'jawn.eth', 'salief.eth'],
  cover:
    'https://ipfs.io/ipfs/bafybeihax3e3suai6qrnjrgletfaqfzriziokl7zozrq3nh42df7u74jyu',
};

const arrayOfChannelData: Channel[] = [
  sampleChannelData,
  sampleChannelData,
  sampleChannelData,
  sampleChannelData,
  sampleChannelData,
  sampleChannelData,
  sampleChannelData,
  sampleChannelData,
];

export default function Home() {
  return (
    <>
      <Header />
      <Stack className=' justify-center h-full mx-[145px] my-5 space-y-4'>
        {/* Channel Grid */}
        <Flex className='flex-wrap gap-5 pb-4'>
          {arrayOfChannelData.map((channel, index) => (
            <ChannelCard key={`${channel}-${index}`} channel={channel} />
          ))}
        </Flex>
      </Stack>
    </>
  );
}
