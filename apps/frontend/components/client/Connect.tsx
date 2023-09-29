import { Avatar } from 'connectkit'
import { ConnectKitButton } from 'connectkit'
import { type Hex } from 'viem'
import {
  Flex,
  Body,
  Stack,
  Button,
  cn,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@river/estuary'
import { shortenAddress } from '@/utils'
import { useDisconnect } from 'wagmi'
import { useGetAddressDisplay, useMediaQuery } from '@/hooks'

function Auth({ address }: { address?: Hex }) {
  const { disconnect } = useDisconnect()
  const { display } = useGetAddressDisplay(address as Hex)
  const { isMobile } = useMediaQuery()

  if (isMobile) {
    return (
      <button type="button">
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
      </button>
    )
  }
  /**
   * Auth Dropdown On Desktop
   **/
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <div className="-my-2 hover:bg-base-hover hover:rounded-full transition-all md:p-2">
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
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mb-3">
        <DropdownMenuItem>
          <button type="button" onClick={() => disconnect()}>
            <Body className="text-label">Disconnect</Body>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function Connect({ className }: { className?: string }) {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, address }) => {
        return isConnected ? (
          <Auth address={address} />
        ) : (
          <Button
            variant="secondary"
            onClick={show}
            className={cn('shadow-soft min-w-[160px]', className)}
          >
            Connect
          </Button>
        )
      }}
    </ConnectKitButton.Custom>
  )
}
