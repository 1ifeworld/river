import { ChannelDialog, User, UsernameDialog } from '@/client'
import { Button, Flex } from '@/design-system'
import { RiverLogo } from '@/server'
import { useLogin, usePrivy } from '@privy-io/react-auth'
import { checkOwnerHasId } from 'lib/username'
import { useState } from 'react'

export function Header() {
  const [open, setOpen] = useState<boolean>(false)

  const { ready, authenticated } = usePrivy()

  const { login } = useLogin({
    onComplete: async (user, isNewUser) => {
      const ownerAddress = user?.wallet?.address
        if (isNewUser || !ownerAddress) {
        setOpen(true)
        return
      }
        const response = await checkOwnerHasId(ownerAddress)
      if (!response.exists) {
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