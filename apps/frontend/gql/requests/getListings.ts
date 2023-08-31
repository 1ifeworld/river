import sdk from '../client';

export async function getListings({ channel }: { channel: string }) {
  const { channels: listings } = await sdk.listings({ channel });

  return {
    listings,
  };
}
