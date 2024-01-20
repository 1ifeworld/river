import { ChannelDialog, User, UsernameDialog, Marquee } from '@/client'
import { Button, Flex, Separator } from '@/design-system'
import { RiverLogo } from '@/server'
import { useLogin, usePrivy } from '@privy-io/react-auth'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

export function Header() {
  const [open, setOpen] = useState<boolean>(false)

  const { ready, authenticated } = usePrivy()

  const { login } = useLogin({
    onComplete: (isNewUser) => {
      // Open the `UsernameDialog` if the user is new
      if (isNewUser) {
        setOpen(true)
      }
    },
    onError: (error) => {
      console.log('Error with Privy login:', error)
    },
  })

  const pathname = usePathname()

  // If the `PrivyProvider` is loading, just display the River logo
  if (!ready) {
    return <RiverLogo />
  }

  return (
    <div className="fixed left-0 right-0 z-50">
      {/* Header */}
      <Flex className="items-center justify-between bg-popover h-10 fixed left-5 right-5 md:absolute">
        <RiverLogo />
        <Flex className="gap-5">
          <ChannelDialog authenticated={authenticated} login={login} />
          {authenticated ? (
            <User setOpen={setOpen} />
          ) : (
            <Button variant="link" onClick={login}>
              Login
            </Button>
          )}
        </Flex>
      </Flex>
      <UsernameDialog open={open} setOpen={setOpen} />
      <Separator className="md:hidden absolute top-10" />
      {/* Marquee */}
      {pathname.startsWith('/item') ? null : (
        <div className="hidden md:block absolute w-screen top-10">
          <Marquee />
        </div>
      )}
    </div>
  )
}
