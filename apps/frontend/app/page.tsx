import { Header, ChannelCard } from '../components/client';
import { type Channel } from '../components/client';
import { getListings } from '../gql/requests/getListings';

const sampleChannelData: Channel = {
  name: 'Channel',
  creator: 'tranqui.eth',
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

export default async function Home() {
  const channels = await getListings({
    channel: '0x5A2AfcD3aA9B1445A49f0bc8f9c11bFe3DA391de',
  });
  return (
    <>
      <Header />
      <main className='mx-[144px] my-5'>
        <div className={`grid grid-cols-6 gap-x-5 gap-y-4`}>
          {arrayOfChannelData.map((channel, index) => (
            <ChannelCard
              key={`${channel}-${index}`}
              channel={channel}
              width={224}
            />
          ))}
        </div>
      </main>
    </>
  );
}
