import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuContent,
  Button,
} from '@/design-system'
import { useLogout } from '@privy-io/react-auth'
import { useState, useEffect } from 'react'
import { getUserId } from '@/gql'
import { useAlchemyContext } from '@/context'
import { type Hex } from 'viem'
import { getCounterfactual, getUsername } from '@/lib'
import { ConnectedWallet, useWallets } from "@privy-io/react-auth";

export function User() {
  const { logout } = useLogout()
  const [userId, setUserId] = useState<number>()
  // const { alchemyProvider, smartAccountAddress } = useAlchemyContext()

  const { wallets } = useWallets();

  const embeddedWallet = wallets.find(
    (wallet) => wallet.walletClientType === "privy"
  );

  useEffect(() => {
    if (embeddedWallet) {
      (async () => {
        const smartAccountAddress = await getCounterfactual({connectedPrivyAccount: embeddedWallet })
        console.log("smart account addresS: ", smartAccountAddress)
        const userId = await getUserId({
          custodyAddress: smartAccountAddress as Hex,
        })
        console.log("userId from counter factual: ", userId)
        setUserId(Number(userId))
      })()
    }
  }, [embeddedWallet])

  console.log("userId: ", userId)

  // useEffect(() => {
  //   // biome-ignore format:
  //   (async () => {
  //     const userId = await getUserId({
  //       smartAccountAddress: smartAccountAddress as Hex,
  //     })
  //     setUserId(userId)
  //   })()
  // }, [alchemyProvider])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* TODO: Update to fetch and return the username of the connected account */}
        <Button variant="link">User</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32" align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Button variant="link" onClick={logout}>
              Logout
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
