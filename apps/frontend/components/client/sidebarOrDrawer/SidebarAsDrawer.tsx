import { Drawer } from 'vaul'
import { Button, Flex, Stack } from '@river/estuary'
import { MenuIcon, LogOutIcon } from 'lucide-react'
import { Connect } from '@/client'
import { useAccount, useDisconnect } from 'wagmi'
import Link from 'next/link'

export function SidebarAsDrawer() {
  const { isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  return (
    <Drawer.Root shouldScaleBackground>
      <Drawer.Trigger className="fixed right-[5%] bottom-[2.5%] z-40" asChild>
        <Button size="icon" shape="circle" className="shadow-reg focus:outline-none h-10 w-10">
          <MenuIcon />
        </Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-label/40" />
        <Drawer.Content className="bg-base flex flex-col rounded-t-[16px] h-fit mt-24 fixed bottom-0 left-0 right-0 z-50">
          <div className="p-4 bg-white rounded-t-[10px] flex-1">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-base-border/40 mb-4" />
            <Stack className="max-w-md mx-auto gap-6">
              <Flex className="items-center justify-between">
                <Connect className="w-full shadow-none rounded-full" />
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
                  <Link href="/channel">New Channel</Link>
                </Button>
              ) : null}
            </Stack>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
