import { getListings } from '../../../gql/requests/getListings';
import { ChannelCard } from '../../../components/client';
import { type Hex } from 'viem';

// http://localhost:3000/channel/0x5A2AfcD3aA9B1445A49f0bc8f9c11bFe3DA391de

export default async function Channel({
  params,
}: {
  params: { channel: Hex };
}) {
  const { channels: listings } = await getListings({
    channel: params.channel,
  });

  return (
    <>
      <p>{params.channel}</p>

      <div className={`grid grid-cols-6 gap-x-5 gap-y-4`}>
        {/* {listings.map((listing, index) => (
        <ChannelCard
          key={`${listing}-${index}`}
          // @ts-ignore
          channel={listing}
          width={224}
        />
      ))} */}
      </div>
    </>
  );
}
