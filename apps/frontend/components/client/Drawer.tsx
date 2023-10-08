import { Drawer as VaulDrawer } from 'vaul'
import { Button, Flex, Stack, Body } from '@river/estuary'
import { MenuIcon, LogOutIcon } from 'lucide-react'
import { MobileConnect } from '@/client'
import { useAccount, useDisconnect } from 'wagmi'
import Link from 'next/link'
import { useMediaQuery } from 'hooks/useMediaQuery'

export function Drawer() {
  const { isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { isMobile } = useMediaQuery()

  if (isMobile) {
    return (
      <VaulDrawer.Root shouldScaleBackground>
        <VaulDrawer.Trigger
          className="fixed right-[5%] bottom-[2.5%] z-40"
          asChild
        >
          <Button
            size="icon"
            shape="circle"
            className="shadow-reg focus-visible:outline-none h-12 w-12"
          >
            <MenuIcon />
          </Button>
        </VaulDrawer.Trigger>
        <VaulDrawer.Portal>
          <VaulDrawer.Overlay className="fixed inset-0 bg-label/40" />
          <VaulDrawer.Content className="bg-base flex flex-col rounded-t-[16px] h-fit mt-24 fixed bottom-0 left-0 right-0 z-50">
            <div className="p-4 bg-white rounded-t-[10px] flex-1">
              <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-base-border/40 mb-4" />
              <Stack className="max-w-md mx-auto gap-6">
                <VaulDrawer.Close asChild>
                  <Button variant="link" className="flex justify-start">
                    <Link href="/">Home</Link>
                  </Button>
                </VaulDrawer.Close>
                <Flex className="items-center justify-between">
                  <MobileConnect />
                  {isConnected ? (
                    <Button
                      onClick={() => disconnect()}
                      size="icon"
                      shape="circle"
                    >
                      <LogOutIcon />
                    </Button>
                  ) : null}
                </Flex>
                {isConnected ? (
                  <Button className="w-full rounded-full">
                    <VaulDrawer.Close asChild>
                      <Link href="/channel">New Channel</Link>
                    </VaulDrawer.Close>
                  </Button>
                ) : null}
              </Stack>
            </div>
          </VaulDrawer.Content>
        </VaulDrawer.Portal>
      </VaulDrawer.Root>
    )
  }

  return null
}
