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

function AuthDropdown({
  ensName,
  truncatedAddress,
  show,
}: {
  ensName?: string;
  truncatedAddress?: string;
  show?: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <BodySmall className='text-onyx'>
          {ensName ? ensName : truncatedAddress}
        </BodySmall>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='bg-white border border-philippine-gray rounded px-8 py-5 mr-3 mt-3'>
        <Flex className='flex-col gap-y-5 items-center'>
          <DropdownMenuItem className='focus:outline-none'>
            <BodySmall className='text-onyx hover:underline cursor-pointer'>
              Disconnect
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
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress, ensName }) => {
        return (
          <button
            type='button'
            className='p-2 font-medium rounded justify-center items-center flex hover:bg-bright-gray'
            onClick={show}
          >
            {isConnected ? (
              <AuthDropdown
                ensName={ensName}
                truncatedAddress={truncatedAddress}
                show={show}
              />
            ) : (
              <BodySmall className='text-onyx'>Connect</BodySmall>
            )}
          </button>
        );
      }}
    </ConnectKitButton.Custom>
  );
}
