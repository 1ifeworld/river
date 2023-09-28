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
    <Stack className='gap-3'>
      <Headline>Typography</Headline>
      <BodyLarge>Primitive text components.</BodyLarge>
      <Stack className='gap-2 border border-base-border rounded-md p-4'>
        <Headline>Headline</Headline>
        <BodyExtraLarge>Body Extra Large</BodyExtraLarge>
        <BodyLarge>Body Large</BodyLarge>
        <Body className='text-label'>Body</Body>
        <BodySmall>Body Small</BodySmall>
      </Stack>
    </Stack>
  );
}
