import { Avatar } from 'connectkit'
import { ConnectKitButton } from 'connectkit'
import { type Hex } from 'viem'
import {
  Flex,
  Body,
  Stack,
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  Separator,
} from '@river/estuary'
import { shortenAddress } from '@/utils'
import { useDisconnect } from 'wagmi'
import { useGetAddressDisplay, useMediaQuery } from '@/hooks'

export function Connect({ className }: { className?: string }) {
  const { isMobile } = useMediaQuery()
  if (isMobile) {
    return null
  }
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, address }) => {
        return isConnected ? (
          <Auth address={address} />
        ) : (
          <Button variant="secondary" shape="circle" onClick={show}>
            Connect
          </Button>
        )
      }}
    </ConnectKitButton.Custom>
  )
}

function Auth({ address }: { address?: Hex }) {
  const { disconnect } = useDisconnect()
  const { display } = useGetAddressDisplay(address as Hex)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <div className="-m-1 p-1 hover:bg-base-hover hover:rounded-full transition-all">
          <Avatar address={address} size={40} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 p-1 m-2 flex flex-col gap-1">
        <DropdownMenuItem>
          <Flex className="items-center gap-[10px]">
            <Avatar address={address} size={40} />
            <Stack className="pr-2 text-left">
              {display !== shortenAddress(address) ? (
                <>
                  <Body className="text-label">{display}</Body>
                  <Body className="text-label-muted">
                    {shortenAddress(address)}
                  </Body>
                </>
              ) : (
                <Body className="text-label-muted">
                  {shortenAddress(address)}
                </Body>
              )}
            </Stack>
          </Flex>
        </DropdownMenuItem>
        <Separator className="bg-base-border h-[0.5px]" />
        <DropdownMenuItem>
          <Button
            prefix="User2"
            variant="link"
            disabled={true}
            className="hover:no-underline"
          >
            Profile
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            prefix="LogOut"
            variant="link"
            onClick={() => disconnect()}
            className="hover:no-underline"
          >
            Disconnect
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
