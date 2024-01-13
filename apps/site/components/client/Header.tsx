import { ChannelDialog, User, UsernameDialog } from '@/client'
import { Button, Flex } from '@/design-system'
import { RiverLogo } from '@/server'
import { useLogin, usePrivy } from '@privy-io/react-auth'
import { useState } from 'react'

export function Header() {
  const [open, setOpen] = useState<boolean>(false)

  const { ready, authenticated } = usePrivy()

  const { login } = useLogin({
    onComplete: (user, isNewUser) => {
      // Open the `UsernameDialog` if the user is new
      if (isNewUser) {
        setOpen(true)
      }
    },
    onError: (error) => {
      console.log('Error with Privy login:', error)
    },
  })

  // If the `PrivyProvider` is loading, just display the River logo
  if (!ready) {
    return <RiverLogo />
  }

  return (
    <>
      <Flex className="items-center justify-between bg-popover sticky top-0 py-[6px] z-50">
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
    </>
  )
}
