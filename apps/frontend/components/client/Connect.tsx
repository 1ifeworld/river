import { ConnectKitButton } from 'connectkit';
import { BodySmall } from '@river/design-system';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Flex,
} from '@river/design-system';
import { useDisconnect } from 'wagmi';

function AuthDropdown({
  ensName,
  truncatedAddress,
  disconnect,
}: {
  ensName?: string;
  truncatedAddress?: string;
  disconnect: () => void;
}) {
  console.log(truncatedAddress)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='focus:outline-none'>
        <BodySmall className='text-onyx'>
          {ensName ? ensName : truncatedAddress}
        </BodySmall>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='bg-white border border-philippine-gray rounded px-8 py-5 mr-3 mt-3'>
        <Flex className='flex-col gap-y-5 items-center'>
          <DropdownMenuItem className='focus:outline-none'>
            <BodySmall className='text-onyx'>
              <button
                className='hover:underline cursor-pointer'
                type='button'
                onClick={() => disconnect()}
              >
                Disconnect
              </button>
            </BodySmall>
          </DropdownMenuItem>
          <DropdownMenuItem className='focus:outline-none'>
            <BodySmall className='text-silver-sand cursor-not-allowed'>
              About River
            </BodySmall>
          </DropdownMenuItem>
        </Flex>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Connect() {
  const { disconnect } = useDisconnect();
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress, ensName }) => {
        return isConnected ? (
          <button type='button' className='p-2 font-medium rounded justify-center items-center flex hover:bg-bright-gray'>
            <AuthDropdown
              ensName={ensName}
              truncatedAddress={truncatedAddress}
              disconnect={disconnect}
            />
          </button>
        ) : (
          <button
            type='button'
            className='p-2 font-medium rounded justify-center items-center flex hover:bg-bright-gray'
            onClick={show}
          >
            <BodySmall className='text-onyx'>Connect</BodySmall>
          </button>
        );
      }}
    </ConnectKitButton.Custom>
  );
}
