import { MenuDialog, UsernameDialog } from '@/client'
import { Button, Flex, Typography } from '@/design-system'
import { RiverLogo } from '@/server'
import { usePrivy } from '@privy-io/react-auth'
import { useUserContext } from '@/context'
import { getUserId } from '@/gql'
import { getUsername } from '@/lib'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import type { Hex } from 'viem'

export function Header() {
  const [open, setOpen] = useState<boolean>(false)
  const { ready, login, authenticated } = usePrivy()
  const { embeddedWallet, userId, username } = useUserContext()

  async function userCheck(embeddedWalletAddress: Hex | undefined) {
    let fetchedUserId
    let fetchedUsername
    if (embeddedWalletAddress) {
      fetchedUserId = await getUserId({
        custodyAddress: embeddedWallet?.address as Hex,
      })
    }
    if (fetchedUserId?.userId) {
      fetchedUsername = await getUsername({
        id: BigInt(fetchedUserId.userId),
      })
    }
    return {
      userId: fetchedUserId?.userId ? fetchedUserId?.userId : null,
      username: fetchedUsername ? fetchedUsername : null,
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      // fetch userId + username values.
      // will return null for userId or username if no address included, or no id/username found
      const { userId, username } = await userCheck(
        embeddedWallet?.address as Hex,
      )
      // if no wallet address detected, dialog should be false
      if (!embeddedWallet?.address) {
        setOpen(false)
      } else {
        // if user is logged in with email, and has valid userId + username, dont show dialog
        if (userId && username) {
          setOpen(false)
        } else {
          // show dialog when a user is logged in, and either userId or username is false
          setOpen(true)
        }
      }
    }
    fetchData()
  }, [embeddedWallet, userId, username])

  const params = useParams()

  return (
    <div className="bg-popover fixed z-50 w-screen">
      {/* Header */}
      <Flex
        className={`py-[11px] px-5 items-center justify-between border-b border-border ${
          params.index || params.username ? '' : 'md:border-none'
        }`}
      >
        <Flex className="gap-x-6">
          <RiverLogo />
          <Link className="hidden md:block" href={'/directory'}>
            <Typography className="text-secondary-foreground underline-offset-2 hover:underline">
              Index
            </Typography>
          </Link>
        </Flex>
        {/* If the `PrivyProvider` is loading, display only the River logo */}
        {!ready ? (
          <></>
        ) : (
          <Flex className="gap-x-5 items-center">
            <MenuDialog />
            {authenticated ? (
              <Link href={`/${username}`}>
                <Typography className="text-primary-foreground">
                  {username}
                </Typography>
              </Link>
            ) : (
              <Button variant="link" onClick={login}>
                <Typography>login</Typography>
              </Button>
            )}
          </Flex>
        )}
      </Flex>
      <UsernameDialog open={open} setOpen={setOpen} />
    </div>
  )
}
