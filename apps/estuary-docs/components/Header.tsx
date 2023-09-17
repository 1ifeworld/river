import { Flex, BodyLarge, Body } from '@river/estuary';
import Link from 'next/link';

export function Header() {
  return (
    <Flex className='px-6 py-3 border-b border-base-border items-center justify-between'>
      <Flex className='gap-4'>
        <BodyLarge className='text-label'>Estuary</BodyLarge>
        <div className='text-label-faint'>|</div>
        <BodyLarge className='text-label-muted'>Documentation</BodyLarge>
      </Flex>
      <Link href='https://github.com/1ifeworld/river/tree/main/packages/estuary'>
        <BodyLarge className='text-label-muted'>GitHub</BodyLarge>
      </Link>
    </Flex>
  );
}
