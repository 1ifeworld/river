import React, { useState } from 'react';
import { Input, Button, Stack, BodyLarge } from '@river/design-system';
import { Channel } from '../../../gql/sdk.generated';
import { useAccount } from 'wagmi';
import { useGetAddressDisplay } from '../../../hooks';
import { zeroAddress } from 'viem';

export function ChannelUri({
  name,
  setName,
  description,
  setDescription,
}: {
  name: string;
  description: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { address } = useAccount();
  const { display } = useGetAddressDisplay(address ? address : zeroAddress);

  return (
    <Stack>
      <Input
        type='text'
        variant='ghost'
        size='lg'
        placeholder='Channel Name'
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          console.log('Updated Name:', e.target.value);
        }}
      />
      <BodyLarge className='text-label-muted'>{display}</BodyLarge>
      <Input
        type='text'
        variant='ghost'
        placeholder='Description'
        onChange={(e) => {
          setDescription(e.target.value);
          console.log('Updated Description:', e.target.value);
        }}
      />
    </Stack>
  );
}
