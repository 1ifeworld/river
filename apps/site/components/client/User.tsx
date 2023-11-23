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
import { type Hex } from 'viem'
import { getCounterfactual, getUsername } from '@/lib'
import { useWallets } from "@privy-io/react-auth";

export function User() {
  const { logout } = useLogout()
  const [userId, setUserId] = useState<number>()
  const [username, setUsername] = useState<number>()

  const { wallets } = useWallets();

  const embeddedWallet = wallets.find(
    (wallet) => wallet.walletClientType === "privy"
  );

  useEffect(() => {
    if (!!embeddedWallet) {
      (async () => {
        // Get counter factual
        const smartAccountAddress = await getCounterfactual({connectedPrivyAccount: embeddedWallet })
        // console.log("counter factual address: ", smartAccountAddress)
        // Get id for custody address
        const { userId } = await getUserId({
          custodyAddress: smartAccountAddress as Hex,
        })
        // console.log("userId from counter factual: ", userId)
        setUserId(Number(userId))
        // Get username for id
        const usernameResponse = await getUsername({id: userId})
        // console.log("username from offhcina db: ", usernameResponse.slice(0, -11))
        setUsername(usernameResponse.slice(0, -11))        
      })()
    }
  }, [embeddedWallet])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* TODO: Update to fetch and return the username of the connected account */}
        <Button variant="link">{username ? username : "NaN"}</Button>
        {/* <Button variant="link">User</Button> */}
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
