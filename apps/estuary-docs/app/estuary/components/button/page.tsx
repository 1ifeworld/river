import {
  Flex,
  Button,
  BodySmall,
  BodyLarge,
  Add,
  Headline,
  Stack,
} from '@river/estuary';
import { PlusIcon } from 'lucide-react';

export default function Page() {
  return (
    <Stack>
      <Stack className='mb-8 gap-2'>
        <Headline>Button</Headline>
        <BodyLarge className='text-label-muted'>Trigger for actions</BodyLarge>
      </Stack>
      <Stack className='gap-10'>
        {/* Primary */}
        <Stack className='gap-2'>
          <BodySmall className='text-gray-400'>Default</BodySmall>
          <Flex className='gap-x-2 items-center'>
            <Button size='sm'>Button</Button>
            <Button size='md'>Button</Button>
            <Button size='lg'>Button</Button>
            <Button shape='circle'>Button</Button>
            <Button loading={true} shape='circle'>Button</Button>
            <Button size='icon'>
              <PlusIcon />
            </Button>
            <Button size='icon' shape='circle'>
              <PlusIcon />
            </Button>
          </Flex>
        </Stack>
        {/* Secondary */}
        <Stack className='gap-2'>
          <BodySmall className='text-gray-400'>Secondary</BodySmall>
          <Flex className='gap-x-2 items-center'>
            <Button variant='secondary' size='sm'>
              Button
            </Button>
            <Button variant='secondary' size='md'>
              Button
            </Button>
            <Button variant='secondary' size='lg'>
              Button
            </Button>
            <Button variant='secondary' shape='circle'>
              Button
            </Button>
            <Button variant='secondary' loading={true} shape='circle'>Button</Button>
            <Button variant='secondary' size='icon'>
              <PlusIcon />
            </Button>
            <Button variant='secondary' size='icon' shape='circle'>
              <PlusIcon />
            </Button>
          </Flex>
        </Stack>
        {/* Link */}
        <Stack className='gap-2'>
          <BodySmall className='text-gray-400'>Link</BodySmall>
          <Flex className='gap-x-2 items-center'>
            <Button variant='link' size='sm'>
              Button
            </Button>
            <Button variant='link' size='md'>
              Button
            </Button>
            <Button variant='link' size='lg'>
              Button
            </Button>
          </Flex>
        </Stack>
      </Stack>
    </Stack>
  );
}
