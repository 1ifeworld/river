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

  return (
    <div className="bg-popover fixed z-50 w-screen">
      {/* Header */}
      <Flex className="py-3 px-5 items-center justify-between border-b border-border md:border-none">
        <RiverLogo />
        {/* If the `PrivyProvider` is loading, display only the River logo */}
        {!ready ? (
          <></>
        ) : (
          <Flex className="gap-x-5">
            <ChannelDialog authenticated={authenticated} login={login} />
            {authenticated ? (
              <User setOpen={setOpen} />
            ) : (
              <Button variant="link" onClick={login}>
                Login
              </Button>
            )}
          </Flex>
        )}
      </Flex>
      <UsernameDialog open={open} setOpen={setOpen} />
    </div>
  )
}
