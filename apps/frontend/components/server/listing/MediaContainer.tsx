import React from 'react'
import { Flex } from '@river/estuary'

export function MediaContainer({ children }: { children: React.ReactNode }) {
  return (
    <Flex className="border-b border-base-shade h-[75%] w-full justify-center items-center">
      {children}
    </Flex>
  )
}
