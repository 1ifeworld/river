import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { PrepareWriteContractResult } from 'wagmi/actions';
import { type Hex, type Hash } from 'viem';
import { routerAbi } from '../abi';
import { router } from '../constants';

interface RemoveDataProps {
  press: Hex;
  data: Hash;
  prepareTxn: boolean;
}

interface RemoveDataReturn {
  removeDataConfig: PrepareWriteContractResult;
  removeData: (() => void) | undefined;
  removeDataLoading: boolean;
  removeDataSuccess: boolean;
}

export function useRemoveData({
  press,
  data,
  prepareTxn,
}: RemoveDataProps): RemoveDataReturn {
  const { config: removeDataConfig } = usePrepareContractWrite({
    address: router,
    abi: routerAbi,
    functionName: 'removeData',
    args: [press, data],
    enabled: prepareTxn,
  });

  const { data: dataToRemove, write: removeData } =
    useContractWrite(removeDataConfig);

  const { isLoading: removeDataLoading, isSuccess: removeDataSuccess } =
    useWaitForTransaction({
      hash: dataToRemove?.hash,
    });

  return {
    removeDataConfig,
    removeData,
    removeDataLoading,
    removeDataSuccess,
  };
}
