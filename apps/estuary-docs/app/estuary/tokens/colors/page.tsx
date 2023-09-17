import {
  Headline,
  Card,
  Flex,
  BodySmall,
  BodyExtraLarge,
} from '@river/estuary';

export default function Page() {
  return (
    <>
      <Headline className='mb-8 text-label'>Colors</Headline>
      <BodyExtraLarge className='mb-6 text-label-muted'>Light</BodyExtraLarge>
      <Flex className='flex-col gap-10'>
        <Flex className='gap-10'>
          {/* Base */}
          <Flex className='flex-col gap-2'>
            <BodySmall className='text-label'>Base</BodySmall>
            <Card size='sm' className='bg-base border border-base-border' />
          </Flex>
          {/* Base Hover */}
          <Flex className='flex-col gap-2'>
            <BodySmall className='text-label'>Base Hover</BodySmall>
            <Card size='sm' className='bg-base-hover' />
          </Flex>
          {/* Base Border */}
          <Flex className='flex-col gap-2'>
            <BodySmall className='text-label'>Base Border</BodySmall>
            <Card size='sm' className='bg-base-border' />
          </Flex>
          {/* Base Shade */}
          <Flex className='flex-col gap-2'>
            <BodySmall className='text-label'>Base Shade</BodySmall>
            <Card size='sm' className='bg-base-shade' />
          </Flex>
        </Flex>
        <Flex className='gap-10'>
          {/* Label */}
          <Flex className='flex-col gap-2'>
            <BodySmall className='text-label'>Label</BodySmall>
            <Card size='sm' className='bg-label' />
          </Flex>
          {/* Label Muted */}
          <Flex className='flex-col gap-2'>
            <BodySmall className='text-label'>Label Muted</BodySmall>
            <Card size='sm' className='bg-label-muted' />
          </Flex>
          {/* Label Faint */}
          <Flex className='flex-col gap-2'>
            <BodySmall className='text-label'>Label Faint</BodySmall>
            <Card size='sm' className='bg-label-faint' />
          </Flex>
        </Flex>
        <Flex className='gap-10'>
          {/* Accent */}
          <Flex className='flex-col gap-2'>
            <BodySmall className='text-label'>Accent</BodySmall>
            <Card size='sm' className='bg-river-accent' />
          </Flex>
          {/* Accent Hover */}
          <Flex className='flex-col gap-2'>
            <BodySmall className='text-label'>Accent Hover</BodySmall>
            <Card size='sm' className='bg-river-accent-hover' />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
