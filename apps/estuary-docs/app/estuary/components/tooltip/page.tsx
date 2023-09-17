import {
  Body,
  Stack,
  BodyLarge,
  Headline,
  Tooltip,
} from '@river/estuary';

export default function Page() {
  return (
    <>
      <Stack className='mb-8 gap-2'>
        <Headline>Tooltip</Headline>
        <BodyLarge className='text-label-muted'>
          Extra information displayed upon hovering
        </BodyLarge>
      </Stack>
      <Stack className='absolute space-y-10'>
        {/* Top */}
        <Tooltip
          content={
            <Body className='text-label-muted'>Set information free</Body>
          }
        >
          <Body className='text-label'>Appear above (default)</Body>
        </Tooltip>
        {/* Right */}
        <Tooltip
          side={'right'}
          content={
            <Body className='text-label-muted'>Set information free</Body>
          }
        >
          <Body className='text-label'>Appear right</Body>
        </Tooltip>
        {/* Bottom */}
        <Tooltip
          side={'bottom'}
          content={
            <Body className='text-label-muted'>Set information free</Body>
          }
        >
          <Body className='text-label'>Appear below</Body>
        </Tooltip>
        {/* Left */}
        <Tooltip
          side={'left'}
          content={
            <Body className='text-label-muted'>Set information free</Body>
          }
        >
          <Body className='text-label'>Appear left</Body>
        </Tooltip>
      </Stack>
    </>
  );
}
