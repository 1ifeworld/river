import {
  Flex,
  Button,
  BodySmall,
  BodyLarge,
  Add,
  Headline,
  Stack,
} from '@river/estuary';

export default function Page() {
  return (
    <Stack>
      <Stack className='mb-8 gap-2'>
        <Headline>Button</Headline>
        <BodyLarge className='text-label-muted'>Trigger for actions</BodyLarge>
      </Stack>
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
          </Flex>
        </Flex>
        {/* Pill */}
        <Flex className='flex-col gap-2'>
          <BodySmall className='text-gray-400'>Pill</BodySmall>
          <Flex className='gap-x-2 items-center'>
            <Button variant='pill' size='default'>
              Button
            </Button>
            <Button variant='pill' size='sm'>
              Button
            </Button>
            <Button variant='pill' size='lg'>
              Button
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Stack>
  );
}
