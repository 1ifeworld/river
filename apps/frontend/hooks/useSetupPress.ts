import {
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction,
  } from 'wagmi';
  import { PrepareWriteContractResult } from 'wagmi/actions';
  import { type Hex, type Hash, parseEther } from 'viem';
  import { routerAbi } from '../abi';
  import { router } from '../constants';
  
  interface SetupPressProps {
    factory: Hex;
    data: Hash;
    prepareTxn: boolean;
    successCallback?: () => void;
  }
  
  interface SetupPressReturn {
    setupPressConfig: PrepareWriteContractResult;
    setupPress: (() => void) | undefined;
    setupPressLoading: boolean;
    setupPressSuccess: boolean;
  }
  
  export function useSetupPress({
    factory,
    data,
    prepareTxn,
    successCallback,
  }: SetupPressProps): SetupPressReturn {
    const { config: setupPressConfig } = usePrepareContractWrite({
      address: router,
      abi: routerAbi,
      functionName: 'setupPress',
      args: [factory, data],
      value: BigInt(0), // harcoded to zero for setupPress call
      enabled: prepareTxn,
    });
  
    const { data: pressToSetup, write: setupPress } =
      useContractWrite(setupPressConfig);
  
    const { isLoading: setupPressLoading, isSuccess: setupPressSuccess } =
      useWaitForTransaction({
        hash: pressToSetup?.hash,
        onSuccess() {
          successCallback?.();
          console.log("success callback ran")
        },
      });
  
    return {
      setupPressConfig,
      setupPress,
      setupPressLoading,
      setupPressSuccess,
    };
  }
  