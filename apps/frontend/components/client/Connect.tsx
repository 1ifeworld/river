import { ConnectKitButton } from 'connectkit';
import { BodySmall } from '@river/design-system';

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
              {isConnected ? ensName ?? truncatedAddress : 'Connect'}
            </BodySmall>
          </button>
        );
      }}
    </ConnectKitButton.Custom>
  );
}
