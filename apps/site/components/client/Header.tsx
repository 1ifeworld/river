import { ChannelDialog, UserDropdown, UsernameDialog } from '@/client'
import { Button, Flex, Typography } from '@/design-system'
import { RiverLogo } from '@/server'
import { useLogin, usePrivy } from '@privy-io/react-auth'
import { checkOwnerHasId } from 'lib/username'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

export function Header() {
  const [open, setOpen] = useState<boolean>(false)

  const { ready, authenticated } = usePrivy()

  const { login } = useLogin({
    onComplete: async (user) => {
      const ownerAddress = user?.wallet?.address
      if (!ownerAddress) {
        setOpen(true)
      } else {
        if (!(await checkOwnerHasId(ownerAddress)).exists) {
          setOpen(true)
        }
      }
    },
  })

  const pathname = usePathname()

  return (
    <div className="bg-popover fixed z-50 w-screen">
      {/* Header */}
      <Flex
        className={`py-3 px-5 items-center justify-between border-b border-border ${
          pathname.startsWith('/item') ? '' : 'md:border-none'
        }`}
      >
        <RiverLogo />
        {/* If the `PrivyProvider` is loading, display only the River logo */}
        {!ready ? (
          <></>
        ) : (
          <Flex className="gap-x-5">
            <ChannelDialog authenticated={authenticated} login={login} />
            {authenticated ? (
              <UserDropdown setOpen={setOpen} />
            ) : (
              <Button variant="link" onClick={login}>
                <Typography>Login</Typography>
              </Button>
            )}
          </Flex>
        )}
      </Flex>
      <UsernameDialog open={open} setOpen={setOpen} />
    </div>
  )
}
