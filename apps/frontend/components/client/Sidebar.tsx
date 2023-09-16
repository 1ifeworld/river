import {
  Stack,
  Flex,
  Body,
  Globe,
  RiverIcon,
  Debug,
} from '@river/design-system'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { Connect } from './Connect'
import { AdminChannels } from './AdminChannels'
import { Hex } from 'viem'
import { useAccount } from 'wagmi'

function Divider() {
  return <div className="w-full h-[0.5px] border border-shade my-4 mx-5" />
}

export function Sidebar() {
  const { isConnected, address } = useAccount()

  return (
    <Stack className="hidden md:flex bg-base border-r border-base-shade h-screen sticky top-0 px-5 pt-10 pb-5">
      <Stack className="justify-between h-full">
        <span>
          <Stack className="gap-1">
            <Body className="text-label-faint font-medium">River</Body>
            {/* Search */}
            {/* <Flex className="items-center gap-x-2">
              <MagnifyingGlassIcon stroke="#C2C2C2" />
              <Body className="text-label-faint">Search</Body>
            </Flex> */}
            <Flex className="items-center gap-x-2">
              <Globe fill="#393939" />
              <Body className="text-label">
                <Link href="/">Home</Link>
              </Body>
            </Flex>
          </Stack>
          {isConnected && <AdminChannels address={address as Hex} />}
          <Body className="text-label">
            <Link href="/channel">+ Create Channel</Link>
          </Body>
        </span>
        <span>
          <Connect />
        </span>
      </Stack>
    </Stack>
  )
}
