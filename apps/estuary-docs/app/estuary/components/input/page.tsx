import {
  Stack,
  BodyLarge,
  Body,
  BodySmall,
  Headline,
  Flex,
  Input,
} from '@river/design-system';

export default function Page() {
  return (
    <>
      <Stack className='mb-8 gap-2'>
        <Headline>Input</Headline>
        <BodyLarge className='text-label-muted mb-8'>Area for user input</BodyLarge>
        <Stack className='gap-10'>
          {/* Default */}
          <Stack className='gap-2'>
            <BodySmall className='text-label-muted'>Default</BodySmall>
            <Input placeholder='Name' />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
