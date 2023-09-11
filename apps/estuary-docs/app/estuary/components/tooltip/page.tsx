import {
  Flex,
  Button,
  Body,
  Stack,
  BodySmall,
  BodyLarge,
  Add,
  Headline,
  Card,
  Tooltip,
} from '@river/design-system';

export default function Page() {
  return (
    <>
      <Stack className='mb-8 gap-2'>
        <Headline>Tooltip</Headline>
        <BodyLarge className='text-label'>
          Extra information displayed upon hovering
        </BodyLarge>
      </Stack>
      <Flex className='flex-col md:flex-row gap-10'>
        {/* Default */}
        <Flex className='flex-col gap-2'>
          <BodySmall className='text-gray-400'>Default</BodySmall>
          <Tooltip>Tooltip</Tooltip>
        </Flex>
      </Flex>
    </>
  );
}
