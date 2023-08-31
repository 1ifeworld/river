import { Flex, Button, BodySmall, Add, Headline } from '@river/design-system';

export default function Page() {
  return (
    <>
      <Headline className='mb-8'>Button</Headline>
      <Flex className='flex-col gap-10'>
        {/* Default */}
        <Flex className='flex-col gap-2'>
          <BodySmall className='text-gray-400'>Default</BodySmall>
          <Flex className='gap-x-2 items-center'>
            <Button variant='default' size='default'>
              Button
            </Button>
            <Button variant='default' size='sm'>
              Button
            </Button>
            <Button variant='default' size='lg'>
              Button
            </Button>
            <Button variant='default' size='icon'>
              <Add className='stroke-white' />
            </Button>
          </Flex>
        </Flex>
        {/* Secondary */}
        <Flex className='flex-col gap-2'>
          <BodySmall className='text-gray-400'>Secondary</BodySmall>
          <Flex className='gap-x-2 items-center'>
            <Button variant='secondary' size='default'>
              Button
            </Button>
            <Button variant='secondary' size='sm'>
              Button
            </Button>
            <Button variant='secondary' size='lg'>
              Button
            </Button>
            <Button variant='secondary' size='icon'>
              <Add className='stroke-black' />
            </Button>
          </Flex>
        </Flex>
        {/* Outline */}
        <Flex className='flex-col gap-2'>
          <BodySmall className='text-gray-400'>Outline</BodySmall>
          <Flex className='gap-x-2 items-center'>
            <Button variant='outline' size='default'>
              Button
            </Button>
            <Button variant='outline' size='sm'>
              Button
            </Button>
            <Button variant='outline' size='lg'>
              Button
            </Button>
            <Button variant='outline' size='icon'>
              <Add className='stroke-black' />
            </Button>
          </Flex>
        </Flex>
        {/* Destructive */}
        <Flex className='flex-col gap-2'>
          <BodySmall className='text-gray-400'>Destructive</BodySmall>
          <Flex className='gap-x-2 items-center'>
            <Button variant='destructive' size='default'>
              Button
            </Button>
            <Button variant='destructive' size='sm'>
              Button
            </Button>
            <Button variant='destructive' size='lg'>
              Button
            </Button>
            <Button variant='destructive' size='icon'>
              <Add className='stroke-white' />
            </Button>
          </Flex>
        </Flex>
        {/* Ghost */}
        <Flex className='flex-col gap-2'>
          <BodySmall className='text-gray-400'>Ghost</BodySmall>
          <Flex className='gap-x-2 items-center'>
            <Button variant='ghost' size='default'>
              Button
            </Button>
            <Button variant='ghost' size='sm'>
              Button
            </Button>
            <Button variant='ghost' size='lg'>
              Button
            </Button>
            <Button variant='ghost' size='icon'>
              <Add className='stroke-black' />
            </Button>
          </Flex>
        </Flex>
        {/* Link */}
        <Flex className='flex-col gap-2'>
          <BodySmall className='text-gray-400'>Link</BodySmall>
          <Flex className='gap-x-2 items-center'>
            <Button variant='link' size='default'>
              Button
            </Button>
            <Button variant='link' size='sm'>
              Button
            </Button>
            <Button variant='link' size='lg'>
              Button
            </Button>
            <Button variant='link' size='icon'>
              <Add className='stroke-black' />
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
