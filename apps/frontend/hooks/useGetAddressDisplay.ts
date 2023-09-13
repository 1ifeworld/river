import { useState, useEffect } from 'react';
import { type Hex } from 'viem';
import { getAddressDisplay } from '../utils';

export function useGetAddressDisplay(address: Hex) {
  const [display, setDisplay] = useState('');

  // run getAddress fetch on any change to address
  useEffect(() => {
    // Only call getAddress if address is not null
    if (address) {
      //@ts-ignore
      getAddressDisplay(address).then((fetchedData) => {
        // Only call setResolvedAddress if fetchedData is not null
        if (fetchedData) {
          setDisplay(fetchedData);
        }
      });
    }
  }, [address]);

  return { display };
}
