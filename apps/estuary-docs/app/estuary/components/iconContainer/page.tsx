import {
  Stack,
  BodyLarge,
  Body,
  BodySmall,
  Headline,
  Flex,
  Input,
  IconContainer,
} from '@river/design-system';
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
          {/* Default */}
          <Stack className='gap-2'>
            <BodySmall className='text-label-muted'>Default</BodySmall>
            <IconContainer>
              <PlusIcon />
            </IconContainer>
          </Stack>
          {/* Square */}
          <Stack className='gap-2'>
            <BodySmall className='text-label-muted'>Square</BodySmall>
            <IconContainer variant='square'>
              <PlusIcon />
            </IconContainer>
          </Stack>
          {/* Small */}
          <Stack className='gap-2'>
            <BodySmall className='text-label-muted'>Small</BodySmall>
            <IconContainer size='sm'>
              <PlusIcon />
            </IconContainer>
          </Stack>
          {/* Small Square */}
          <Stack className='gap-2'>
            <BodySmall className='text-label-muted'>Small</BodySmall>
            <IconContainer variant='square' size='sm'>
              <PlusIcon />
            </IconContainer>
          </Stack>
        </Flex>
      </Stack>
    </>
  );
}
