import sdk from '../client';

export async function getListings({ channel }: { channel: string }) {
  const { channels } = await sdk.listings({ channel });

  return {
    channels,
  };
}
