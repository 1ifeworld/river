import {
  Headline,
  Card,
  Flex,
  BodySmall,
  BodyExtraLarge,
} from '@river/design-system';

export default function Page() {
  return (
    <>
      <Headline className='mb-8 text-label'>Colors</Headline>
      <BodyExtraLarge className='mb-6 text-labelMuted'>Light</BodyExtraLarge>
      <Flex className='flex-col gap-10'>
        <Flex className='gap-10'>
          {/* Base */}
          <Flex className='flex-col gap-2'>
            <BodySmall className='text-label'>Base</BodySmall>
            <Card size='sm' className='bg-base border border-baseBorder' />
          </Flex>
          {/* Base Hover */}
          <Flex className='flex-col gap-2'>
            <BodySmall className='text-label'>Base Hover</BodySmall>
            <Card size='sm' className='bg-baseHover' />
          </Flex>
          {/* Base Border */}
          <Flex className='flex-col gap-2'>
            <BodySmall className='text-label'>Base Border</BodySmall>
            <Card size='sm' className='bg-baseBorder' />
          </Flex>
          {/* Base Shade */}
          <Flex className='flex-col gap-2'>
            <BodySmall className='text-label'>Base Shade</BodySmall>
            <Card size='sm' className='bg-baseShade' />
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
            <Card size='sm' className='bg-labelMuted' />
          </Flex>
          {/* Label Faint */}
          <Flex className='flex-col gap-2'>
            <BodySmall className='text-label'>Label Faint</BodySmall>
            <Card size='sm' className='bg-labelFaint' />
          </Flex>
        </Flex>
        <Flex className='gap-10'>
          {/* Accent */}
          <Flex className='flex-col gap-2'>
            <BodySmall className='text-label'>Accent</BodySmall>
            <Card size='sm' className='bg-accent' />
          </Flex>
          {/* Accent Hover */}
          <Flex className='flex-col gap-2'>
            <BodySmall className='text-label'>Accent Hover</BodySmall>
            <Card size='sm' className='bg-accentHover' />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
