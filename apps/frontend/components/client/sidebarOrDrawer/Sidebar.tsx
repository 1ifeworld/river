import { Stack, Body, Flex, BodySmall, BodyLarge } from '@river/estuary'
import Link from 'next/link'
import { Connect } from '../Connect'
import { AdminChannels } from '../AdminChannels'
import { Hex } from 'viem'
import { useAccount } from 'wagmi'

export function Sidebar() {
  const { isConnected, address } = useAccount()

  return (
    <Stack className="hidden md:flex bg-base border-r border-base-shade h-screen sticky top-0 px-5 pt-10 pb-5">
      <Stack className="justify-between h-full">
        <span>
          <Stack className="gap-2">
            {/* River */}
            <Flex className="gap-2 items-center">
              <Link href="/">
                <BodyLarge className="text-label font-medium cursor-default hover:text-label/80">
                  River
                </BodyLarge>
              </Link>
              <div className="bg-label rounded-[2px] px-1 py-[0.5px]">
                <BodySmall className="text-[#FFFFFF] text-[10px] uppercase">
                  testnet
                </BodySmall>
              </div>
            </Flex>
            {/* Create Channel */}
            <Link href="/channel">
              <Body className="text-label-faint hover:text-label-faint/60 font-medium my-2">
                Create Channel
              </Body>
            </Link>
            {/* My Channels */}
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
