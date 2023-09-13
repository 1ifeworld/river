import { Stack, Flex, Body, Globe, RiverIcon } from '@river/design-system';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { Connect } from './Connect';
import { AdminChannels } from './AdminChannels';
import { Hex } from 'viem';
import { useAccount } from 'wagmi';

export function Sidebar() {
  const { isConnected, address } = useAccount();

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
          {isConnected && <AdminChannels address={address as Hex} />}
        </span>
        <Connect />
      </Stack>
    </Stack>
  );
}
