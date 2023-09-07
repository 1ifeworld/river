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

export function Sidebar() {
  return (
    <Stack className='hidden md:flex bg-base border-r border-base-border h-screen sticky top-0 w-[210px] p-5'>
      <Stack className='justify-between h-full'>
        <span>
          <RiverIcon />
          <Stack className='gap-3 my-8'>
            <Flex className='items-center gap-x-2'>
              {/* TODO: replace with custom `SearchIcon` */}
              {/* TODO: pass the `label` var value here instead of hardcoding */}
              <MagnifyingGlassIcon stroke='#C2C2C2' />
              <Body className='text-label-faint'>Search</Body>
            </Flex>
            <Flex className='items-center gap-x-2'>
              {/* TODO: pass the `label` var value here instead of hardcoding */}
              <Globe fill='#393939' />
              <Body className='text-label'>
                <Link href='/'>Home</Link>
              </Body>
            </Flex>
          </Stack>
          <Body className='text-label-faint font-medium'>Favorites</Body>
        </span>
        <Connect />
      </Stack>
    </Stack>
  );
}
