import { Avatar } from 'connectkit'
import { ConnectKitButton } from 'connectkit'
import { type Hex } from 'viem'
import { Flex, Body, Stack, Button } from '../../../../packages/estuary/src'
import { firstSeven } from '../../utils'
import { useDisconnect } from 'wagmi'

function Auth({ address, ensName }: { address?: Hex; ensName?: string }) {
  const { disconnect } = useDisconnect()
  return (
    <button
      type="button"
      onClick={() => disconnect()}
      className="-m-2 hover:bg-base-hover hover:rounded-full transition-all p-2 min-w-[133px]"
    >
      <Flex className="items-center gap-[10px]">
        <Avatar address={address} size={40} />
        <Stack className="pr-2">
          {ensName ? (
            <>
              <Body className="text-label">{ensName}</Body>
              <Body className="text-label-muted">{firstSeven(address)}</Body>
            </>
          ) : (
            <Body className="text-label-muted">{firstSeven(address)}</Body>
          )}
        </Stack>
      </Flex>
    </button>
  )
}

export function Connect() {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, address, ensName }) => {
        return isConnected ? (
          <Auth address={address} ensName={ensName} />
        ) : (
          <Button
            onClick={show}
            className="-m-2 bg-base hover:bg-base-hover border border-base-border shadow-reg"
          >
            <Body className="text-label">Connect</Body>
          </Button>
        )
      }}
    </ConnectKitButton.Custom>
  )
}
