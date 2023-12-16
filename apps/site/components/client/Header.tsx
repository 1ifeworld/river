import { Button, Flex } from '@/design-system'
import { useLogin, usePrivy } from '@privy-io/react-auth'
import { useState } from 'react'
import { User, UsernameDialog, ChannelDialog } from '@/client'
import { RiverLogo } from '@/server'

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
      <Flex className="items-center justify-between px-5">
        <RiverLogo />
        <Flex className="gap-4">
          <ChannelDialog authenticated={authenticated} login={login} />
          {authenticated ? (
            <User />
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
