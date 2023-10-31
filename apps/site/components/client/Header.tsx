import { Button, Flex, Typography } from '@/design-system'
import { useLogin, usePrivy } from '@privy-io/react-auth'
import { useState } from 'react'
import { Register, User, UsernameDialog, AddNew } from '@/client'
import { RiverLogo } from '@/server'

export function Header() {
  const { ready, authenticated, user } = usePrivy()

  const [open, setOpen] = useState<boolean>(false)

  const { login } = useLogin({
    onComplete: (user, isNewUser, wasAlreadyAuthenticated) => {
      // Check to see if the user has a username
      // In this case this will just fire if the user is new
      if (isNewUser) {
        setOpen(true)
      }
    },
    onError: (error) => {
      console.log(error)
      // Any logic you'd like to execute after a user exits the login flow or there is an error
    },
  })

  // Show nothing if user is not authenticated or data is still loading
  // if (!(ready && authenticated) || !user) {
  //   return null
  // }

  return (
    <>
      {/* <Register /> */}
      <Flex className="items-center justify-between">
        <RiverLogo />
        {authenticated ? (
          <Flex className="gap-4">
            <AddNew />
            <User />
          </Flex>
        ) : (
          <Button variant="link" onClick={login}>
            Login
          </Button>
        )}
      </Flex>
      <UsernameDialog open={open} />
    </>
  )
}
