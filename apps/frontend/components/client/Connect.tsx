import { ConnectKitButton } from 'connectkit';
import { BodySmall } from '@river/design-system';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
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
      <DropdownMenuTrigger>{ensName || truncatedAddress}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <BodySmall className='text-onyx'>Disconnect</BodySmall>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <BodySmall className='text-onyx'>Disconnect</BodySmall>
        </DropdownMenuItem>
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
            <BodySmall className='text-onyx'>
              {isConnected ? (
                <AuthDropdown
                  ensName={ensName}
                  truncatedAddress={truncatedAddress}
                  show={show}
                />
              ) : (
                'Connect'
              )}
            </BodySmall>
          </button>
        );
      }}
    </ConnectKitButton.Custom>
  );
}
