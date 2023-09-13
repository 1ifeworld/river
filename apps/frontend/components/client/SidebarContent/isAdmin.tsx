import React, { useState, useEffect } from 'react';
import { Hex } from "viem";
import { getAdminChannels } from "../../../gql/requests/getAdmin";
import { Channel } from '../../../gql/sdk.generated';
import { Stack, Body } from '@river/design-system';
import Link from 'next/link';

interface AdminChannelsProps {
  address: Hex;
}

const AdminChannels: React.FC<AdminChannelsProps> = ({ address }) => {
  const [adminChannels, setAdminChannels] = useState<Channel[]>([]);
  useEffect(() => {
    async function fetchAdminChannels() {
      const data = await getAdminChannels(address);
      if (data && data.adminChannels) {
        setAdminChannels(data.adminChannels);
      }
    }

    fetchAdminChannels();
  }, [address]);

  return (
    <Stack>
       <Body className='text-label-faint font-medium'>My Channels</Body>

       <ul>
        {adminChannels.map(channel => (
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

export default AdminChannels;
