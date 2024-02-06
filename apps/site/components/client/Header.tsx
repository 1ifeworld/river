import { ChannelDialog, User, UsernameDialog } from '@/client'
import { Button, Flex, Typography } from '@/design-system'
import { RiverLogo } from '@/server'
import { useLogin, usePrivy } from '@privy-io/react-auth'
import { checkOwnerHasId } from 'lib/username'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import { useUserContext } from 'context/UserContext'
import { Hex } from 'viem'
import { getUserId } from '@/gql'
import { getUsername } from 'lib/username'


export function Header() {
  const [open, setOpen] = useState<boolean>(false)
  const { ready, authenticated } = usePrivy()

  /*
      The tricky part I believe is not being able to rely
      on the userContext in the "onComplete" set, because
      userContext wont necessarily have fetched the results yet
  */

  const { login } = useLogin({
    onComplete: async (user) => {
      // Fetch user id for embedded wallet
      const fetchedUserId = await getUserId({
        custodyAddress: user.wallet?.address as Hex,
      })      
      // Fetch username from ponder. this will let us know
      // if user has succsffuly registered an id, even in cases
      // where the writing to username db was unncessfuly
      const fetchedUsername = await getUsername({
        id: BigInt(fetchedUserId.userId),
      })
      // If user doesnt have id or username, open username dialog
      if (!fetchedUserId || !fetchedUsername) {
        setOpen(true)
      }
    },
  })

  const params = useParams()

  return (
    <div className="bg-popover fixed z-50 w-screen">
      {/* Header */}
      <Flex
        className={`py-3 px-5 items-center justify-between border-b border-border ${
          params.index ? '' : 'md:border-none'
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
              <User setOpen={setOpen} />
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
