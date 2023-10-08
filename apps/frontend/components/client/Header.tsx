import { Flex, RiverIcon } from '@river/estuary'
import { Connect } from '@/client'

export function Header() {
  return (
    <Flex className="items-center justify-between m-6 md:m-10">
      <RiverIcon />
      <Connect />
    </Flex>
  )
}
