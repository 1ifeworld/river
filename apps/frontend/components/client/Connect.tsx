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
  Separator,
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
        <div className="-my-2 hover:bg-base-hover hover:rounded-full transition-all md:p-1">
          <Flex className="items-center gap-[10px]">
            <Avatar address={address} size={40} />
          </Flex>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 p-1 m-4 mr-6 flex flex-col gap-1">
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
        <Separator className='bg-base-border h-[0.5px]'/>
        <DropdownMenuItem>
          <Button variant='link' disabled={true} className='hover:no-underline'>
            Profile
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button variant='link' onClick={() => disconnect()} className='hover:no-underline'>
            Disconnect
          </Button>
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
          <Button variant="secondary" shape="circle" onClick={show}>
            Connect
          </Button>
        )
      }}
    </ConnectKitButton.Custom>
  )
}
