import {
  Flex,
  Button,
  BodySmall,
  BodyLarge,
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
          <BodySmall className='text-label'>Default</BodySmall>
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
            <Button prefix='Plus'>
              Button
            </Button>
          </Flex>
        </Stack>
        {/* Secondary */}
        <Stack className='gap-2'>
          <BodySmall className='text-label'>Secondary</BodySmall>
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
            <Button variant='secondary' prefix='Plus'>
              Button
            </Button>
          </Flex>
        </Stack>
        {/* Link */}
        <Stack className='gap-2'>
          <BodySmall className='text-label'>Link</BodySmall>
          <Flex className='gap-x-2 items-center'>
            <Button variant='link'>
              Button
            </Button>
          </Flex>
        </Stack>
      </Stack>
    </Stack>
  );
}
