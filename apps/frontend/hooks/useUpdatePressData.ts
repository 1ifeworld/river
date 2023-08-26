import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { PrepareWriteContractResult } from 'wagmi/actions';
import { type Hex, type Hash, parseEther } from 'viem';
import { routerAbi } from '../abi';
import { router } from '../constants';

interface UpdatePressDataProps {
  press: Hex;
  data: Hash;
  value?: string;
  prepareTxn: boolean;
}

interface UpdatePressDataReturn {
  updatePressDataConfig: PrepareWriteContractResult;
  updatePressData: (() => void) | undefined;
  updatePressDataLoading: boolean;
  updatePressDataSuccess: boolean;
}

export function useUpdatePressData({
  press,
  data,
  value,
  prepareTxn,
}: UpdatePressDataProps): UpdatePressDataReturn {
  const { config: updatePressDataConfig } = usePrepareContractWrite({
    address: router,
    abi: routerAbi,
    functionName: 'updatePressData',
    args: [press, data],
    value: value ? parseEther(value) : BigInt(0),
    enabled: prepareTxn,
  });

  const { data: dataToUpdatePress, write: updatePressData } = useContractWrite(
    updatePressDataConfig
  );

  const {
    isLoading: updatePressDataLoading,
    isSuccess: updatePressDataSuccess,
  } = useWaitForTransaction({
    hash: dataToUpdatePress?.hash,
  });

  return {
    updatePressDataConfig,
    updatePressData,
    updatePressDataLoading,
    updatePressDataSuccess,
  };
}
