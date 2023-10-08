import { Avatar } from 'connectkit'
import { ConnectKitButton } from 'connectkit'
import { type Hex } from 'viem'
import { Flex, Body, Stack, Button } from '@river/estuary'
import { shortenAddress } from '@/utils'
import { useGetAddressDisplay } from '@/hooks'

export function MobileConnect({ className }: { className?: string }) {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, address }) => {
        return isConnected ? (
          <MobileAuth address={address} />
        ) : (
          <Button variant="secondary" shape="circle" onClick={show}>
            Connect
          </Button>
        )
      }}
    </ConnectKitButton.Custom>
  )
}

function MobileAuth({ address }: { address?: Hex }) {
  const { display } = useGetAddressDisplay(address as Hex)

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
            <Body className="text-label-muted">{shortenAddress(address)}</Body>
          )}
        </Stack>
      </Flex>
    </button>
  )
}
