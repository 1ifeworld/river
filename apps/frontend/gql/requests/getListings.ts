import sdk from '../client';
import { type Hex } from 'viem';

export async function getListings({ channel }: { channel: Hex }) {
  const { channels } = await sdk.listings({ channel: channel.toString() });

  return {
    channels,
  };
}
