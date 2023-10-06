import {
  Flex,
  Button,
  BodySmall,
  Headline,
  Card,
} from '@river/estuary';

export default function Page() {
  return (
    <>
      <Headline className='mb-8'>Card</Headline>
      <Flex className='flex-col md:flex-row gap-10'>
        {/* Default */}
        <Flex className='flex-col gap-2'>
          <BodySmall className='text-gray-400'>Default</BodySmall>
          <Card size='default' className='bg-gray-100' />
        </Flex>
        {/* Icon */}
        <Flex className='flex-col gap-2'>
          <BodySmall className='text-gray-400'>Icon</BodySmall>
          <Card size='icon' className='bg-gray-100' />
        </Flex>
        {/* Small */}
        <Flex className='flex-col gap-2'>
          <BodySmall className='text-gray-400'>Small</BodySmall>
          <Card size='sm' className='bg-gray-100' />
        </Flex>
        {/* Large */}
        <Flex className='flex-col gap-2'>
          <BodySmall className='text-gray-400'>Large</BodySmall>
          <Card size='lg' className='bg-gray-100' />
        </Flex>
      </Flex>
    </>
  );
}
