import {
  Stack,
  BodyLarge,
  Body,
  BodySmall,
  Headline,
  Flex,
  Input,
  IconContainer,
} from '@river/estuary';
import { PlusIcon } from 'lucide-react';

export default function Page() {
  return (
    <>
      <Stack className='mb-8 gap-2'>
        <Headline>Icon Container</Headline>
        <BodyLarge className='text-label-muted mb-8'>
          Estuary Iconography
        </BodyLarge>
        <Flex className='gap-10'>
          {/* Small */}
          <Stack className='gap-2'>
            <BodySmall className='text-label-muted'>Small</BodySmall>
            <IconContainer icon='Plus' />
          </Stack>
          {/* Medium */}
          <Stack className='gap-2'>
            <BodySmall className='text-label-muted'>Medium</BodySmall>
            <IconContainer icon='Plus' size='24' />
          </Stack>
          {/* Large */}
          <Stack className='gap-2'>
            <BodySmall className='text-label-muted'>Large</BodySmall>
            <IconContainer icon='Plus' size='32' />
          </Stack>
        </Flex>
      </Stack>
    </>
  );
}
