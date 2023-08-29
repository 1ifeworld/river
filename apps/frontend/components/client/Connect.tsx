import { ConnectKitButton } from 'connectkit';
import { BodySmall } from '@river/design-system';

export function Connect() {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress, ensName }) => {
        return (
          <button
            type='button'
            className='px-2 py-4 rounded justify-center items-center flex hover:bg-bright-gray'
            onClick={show}
          >
            <BodySmall className='text-onyx'>
              {isConnected ? ensName ?? truncatedAddress : 'Connect Wallet'}
            </BodySmall>
          </button>
        );
      }}
    </ConnectKitButton.Custom>
  );
}
