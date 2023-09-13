import { Stack, BodyLarge, Headline } from '@river/design-system';

export default function Page() {
  return (
    <>
      <Stack className='mb-8 gap-2'>
        <Headline>Input</Headline>
        <BodyLarge className='text-label-muted'>Area for user input</BodyLarge>
      </Stack>
    </>
  );
}
