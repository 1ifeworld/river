import { Header } from "../components/client";
import { AllChannels } from "../components/channel/AllChannels";
import { type Channel } from "../types/types";
import { getAllChannels } from "../gql/requests/getAllChannels";
import { Hex } from "viem";



export default async function Home() {
  const { channels } = await getAllChannels();

  const ipfsToHttps = (ipfsString: string) => {
    if (!ipfsString) return '';
    console.log("IPFS", ipfsString)
    return ipfsString.replace('ipfs://', 'https://ipfs.io/ipfs/');
  };

  // TODO JDR: make it work with uri
  const channelsWithNoName = channels.filter(channel => channel?.contractUri?.image && channel.contractUri.image.trim() !== "");

  const channelsInput: Channel[] = channelsWithNoName.map(channel => ({
    name: channel?.contractUri?.name as string,
    description: channel?.contractUri?.description as string,
    cover: ipfsToHttps(channel?.contractUri?.image as string),
    creator: channel?.createdBy as Hex,
    members: channel?.logicTransmitterMerkleAdmin[0]?.accounts as string[],
  }));
  
  return (
    <>
      <Header />
      <main className="flex flex-col justify-center h-full mx-[145px] my-[20px] space-y-4">
        {/* Channel card grid */}
        <div className={`grid grid-cols-6 gap-x-[21px] gap-y-[18px] pb-4`}>
        </div>
        <div>    <AllChannels channel={channelsInput} /></div>
      </main>
    </>
  ) }