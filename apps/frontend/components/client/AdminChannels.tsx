import { useEffect, useState } from 'react';
import { Hex } from 'viem';
import { getAdminChannels } from '../../gql/requests/getAdminChannels';
import { type Channel } from '../../gql/sdk.generated';
import { Stack, Body } from '@river/design-system';
import Link from 'next/link';

export function AdminChannels({ address }: { address: Hex }) {
  const [adminChannels, setAdminChannels] = useState<Channel[]>([]);

  useEffect(() => {
    if (!address) return;
    (async () => {
      try {
        const { adminChannels } = await getAdminChannels(address);
        setAdminChannels(adminChannels);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [address]);

  return (
    <Stack>
      <Body className='text-label-faint font-medium mb-2'>My Channels</Body>
      <ul>
        {adminChannels.map((channel) => (
          <li key={channel.id}>
            <Link href={`/channel/${channel.id}`} passHref>
              <Body className='text-label'>{channel?.contractUri?.name}</Body>
            </Link>
          </li>
        ))}
      </ul>
    </Stack>
  );
}
