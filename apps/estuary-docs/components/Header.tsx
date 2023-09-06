import { Flex, BodyLarge, Body } from '@river/design-system';
import Link from 'next/link';

export function Header() {
  return (
    <Flex className='px-6 py-3 border-b border-baseBorder items-center justify-between'>
      <Flex className='gap-4'>
        <BodyLarge className='text-label'>Estuary</BodyLarge>
        <div className='text-labelFaint'>|</div>
        <BodyLarge className='text-labelMuted'>Documentation</BodyLarge>
      </Flex>
      <Link href='https://github.com/1ifeworld/river/tree/main/packages/design-system'>
        <BodyLarge className='text-labelMuted'>GitHub</BodyLarge>
      </Link>
    </Flex>
  );
}
