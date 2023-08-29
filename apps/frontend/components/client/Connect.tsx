import { ConnectKitButton } from 'connectkit';
import { BodySmall } from '@river/design-system';

export const Connect = () => {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress, ensName }) => {
        return (
          <button
            type='button'
            className='px-4 py-3 bg-dark-gunmetal rounded-xl border border-arsenic justify-center items-center flex  hover:border-dark-gray'
            onClick={show}
          >
            <BodySmall className='text-platinum'>
              {isConnected ? ensName ?? truncatedAddress : 'Connect Wallet'}
            </BodySmall>
          </button>
        );
      }}
    </ConnectKitButton.Custom>
  );
};