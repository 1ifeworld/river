import { 
  Header, 
  ChannelCard 
} from '../components/client';
import { type Channel } from '../components/client';

const sampleChannelData: Channel = {
  name: "Channel",
  creator: "tranqui.eth",
  members: [],
  cover: "https://ipfs.io/ipfs/bafybeihax3e3suai6qrnjrgletfaqfzriziokl7zozrq3nh42df7u74jyu"
}

const arrayOfChannelData: Channel[] = [
  sampleChannelData,
  sampleChannelData,
  sampleChannelData,
  sampleChannelData,
  sampleChannelData,
  sampleChannelData,
  sampleChannelData,
  sampleChannelData  
]

export default function Home() {
  return (
    <>
      <Header />
      <main className="mx-[145px] my-[20px]">
        <div className={`grid grid-cols-6 gap-x-[21px] gap-y-[18px] pb-4`}>
          {arrayOfChannelData.map((channel, index) => (
            <ChannelCard
              key={`${channel}-${index}`}
              channel={channel}
              width={222}
            />
          ))}
        </div>        
      </main>
    </>
  );
}
