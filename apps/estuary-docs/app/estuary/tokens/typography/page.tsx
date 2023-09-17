import {
  Stack,
  Headline,
  Body,
  BodyExtraLarge,
  BodyLarge,
  BodySmall,
} from '@river/estuary';

export default function Page() {
  return (
    <>
      <Headline className='mb-8'>Typography</Headline>
      <Stack className='gap-10'>
        <Stack className='gap-2'>
          <Headline>Headline</Headline>
          <BodyExtraLarge>Body Extra Large</BodyExtraLarge>
          <BodyLarge>Body Large</BodyLarge>
          <Body>Body</Body>
          <BodySmall>Body Small</BodySmall>
        </Stack>
      </Stack>
    </>
  );
}
