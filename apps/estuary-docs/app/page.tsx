import { SideNav } from '../components/client';
import { Flex, Headline, Body, BodyLarge } from '@river/design-system';

function Header() {
  return (
    <Flex className='px-4 py-2 border-b border-gray-300 gap-4 items-center'>
      <Body className='font-bold'>Estuary</Body>
      <div className=''>|</div>
      <Body className='text-gray-400'>Documentation</Body>
    </Flex>
  );
}

export default function Home() {
  return (
    <>
      <Header />

      <SideNav />
    </>
  );
}
