import { Flex, Body } from '@river/design-system';
import Link from 'next/link';

export function Header() {
  return (
    <Flex className='px-6 py-3 border-b border-gray-300 items-center justify-between'>
      <Flex className='gap-4'>
        <Body className='text-black'>Estuary</Body>
        <div className='text-gray-200'>|</div>
        <Body className='text-gray-400'>Documentation</Body>
      </Flex>
      <Link href='https://github.com/1ifeworld/river/tree/main/packages/design-system'>
        <Body className='text-gray-400 hover:text-gray-500'>GitHub</Body>
      </Link>
    </Flex>
  );
}
