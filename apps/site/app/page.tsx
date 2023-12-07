import { Grid } from '@/design-system'
import { getAllChannels, type Channel } from '@/gql'
import { ChannelCard } from '@/server'

export default async function Home() {
  const { channels } = await getAllChannels()

  console.log("******  before test cid lookup ")
  await testCidLookup()
  console.log("****** before test cid lookup ")


  return (
    <div>
      <Grid className="grid-cols-1 md:grid-cols-[repeat(auto-fill,_minmax(272px,_1fr))] gap-2 pt-6">
        {channels.map((channel: Channel) => (
          <ChannelCard key={channel.id} channel={channel} />
        ))}
      </Grid>
    </div>
  )
}

async function testCidLookup() {
  const url = 'https://river-site-metadata-ar4p1vbuv-1ifeworld.vercel.app/get';
  // const url = 'http://localhost:8080/get';
  const cid = 'ipfs://bafkreia3dhbbkmjsexdgalc3qbhevy55fyxygs7p3zgoluxbu25augzwmy';
  const body = JSON.stringify({ cids: [cid] });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
