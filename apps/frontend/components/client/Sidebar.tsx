import {
  Stack,
  Flex,
  Body,
  BodyLarge,
  SearchIcon,
  Add,
  Globe,
  RiverIcon,
  Debug,
  Button,
} from '@river/estuary'
import Link from 'next/link'
import { Connect } from './Connect'
import { AdminChannels } from './AdminChannels'
import { Hex } from 'viem'
import { useAccount } from 'wagmi'

export function Sidebar() {
  const { isConnected, address } = useAccount()

  return (
    <Stack className="hidden md:flex bg-base border-r border-base-shade h-screen sticky top-0 px-5 pt-10 pb-5">
      <Stack className="justify-between h-full">
        <span>
          <Stack className="gap-2">
            <span>
              <Body className="text-label-faint font-medium cursor-default">
                River
              </Body>
              <Link href="/">
                <Body className="text-label hover:underline">Home </Body>
              </Link>
            </span>
            <Link href="/channel">
              <Body className="text-label-faint hover:text-label-faint/80 font-medium my-2">
                Create Channel
              </Body>
            </Link>

            {isConnected && <AdminChannels address={address as Hex} />}
          </Stack>
        </span>

        <span>
          <Connect />
        </span>
      </Stack>
    </Stack>
  )
}
