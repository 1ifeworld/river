'use client'

import { Stack, cn } from '@/design-system'
import { Reference } from '@/gql'
import { useMediaQuery } from '@/hooks'
import { useRouter } from 'next/navigation'
import { MouseEvent, PropsWithChildren } from 'react'

type ContentWrapperProps = PropsWithChildren<{
  item: Reference
  className?: string
}>

export function ContentWrapper({
  item,
  className,
  children,
}: ContentWrapperProps) {
  // Declare current router + isMobile status
  const router = useRouter()
  const { isMobile } = useMediaQuery()
  // Extract base channel from item object
  const baseChannel = item.channel
  // Extract references from baseChannel
  const baseChannelReferences = item.channel?.references
  // Find index of current item in the base channel references
  const currentReferenceIndex = item.channel?.references.findIndex(
    (ref) => ref.id === item.id,
  )
  // Initialize nextReference + prevReference variables
  let nextReference: string | null = null
  let prevReference: string | null = null
  // Prev ref: if current index is 0, return null since there are no previous references in channel
  // Next ref: if current index == baseChannelReferences.length -1, return null since there are no next references in channel
  if (baseChannelReferences) {
    nextReference =
      currentReferenceIndex === baseChannelReferences.length - 1
        ? null
        : item.channel?.references[(currentReferenceIndex as number) + 1].id
    prevReference =
      currentReferenceIndex === 0
        ? null
        : item.channel?.references[(currentReferenceIndex as number) - 1].id
  }

  // cant trigger prevReference route change if active item is index 0 of base channel
  // cant trigger nextReference route change if active item is in last index of base channel
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - bounds.left
    const width = bounds.width
    // Trigger route change
    if (x < width * 0.1 && nextReference) {
      // Left 10% clicked, increment route
      router.push(`/item/${nextReference}`)
    } else if (x > width * 0.9 && prevReference) {
      // Right 10% clicked, decrement route
      router.push(`/item/${prevReference}`)
    }
  }

  return (
    <div
      onClick={isMobile ? handleClick : undefined}
      className="flex justify-end w-full"
    >
      <Stack className={cn(className)}>{children}</Stack>
    </div>
  )
}
