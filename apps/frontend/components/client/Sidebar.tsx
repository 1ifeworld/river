import {
  Stack,
  Menu,
  Flex,
  Body,
  Globe,
  RiverIcon,
  cn,
} from '@river/design-system';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { Connect } from './Connect';
import AdminChannels from './SidebarContent/isAdmin';
import { useState } from 'react';
import { Hex } from 'viem';

export function Sidebar() {
  const [isConnected, setIsConnected] = useState(false);
  const [authAddress, setAuthAddress] = useState<Hex | null>(null);


  const handleConnect = (address: Hex) => {
    setIsConnected(true);
    setAuthAddress(address);
  };

  return (
    <Stack className='hidden md:flex bg-base border-r border-base-shade h-screen sticky top-0 w-[210px] p-5'>
      <Stack className='justify-between h-full'>
        <span>
          <RiverIcon />
          <Stack className='gap-3 my-8'>
            <Flex className='items-center gap-x-2'>
              <MagnifyingGlassIcon stroke='#C2C2C2' />
              <Body className='text-label-faint'>Search</Body>
            </Flex>
            <Flex className='items-center gap-x-2'>
              <Globe fill='#393939' />
              <Body className='text-label'>
                <Link href='/'>Home</Link>
              </Body>
            
            </Flex>
          </Stack>
          <Body className='text-label-faint font-medium'>Favorites</Body>
        </span>
     
        {/* Conditionally render the AdminChannels component */}
 
        {isConnected && authAddress && <AdminChannels address={authAddress} />}

        <Connect onConnect={handleConnect} />
      </Stack>
    </Stack>
  );
}
