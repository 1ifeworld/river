import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { PrepareWriteContractResult } from 'wagmi/actions';
import { type Hex, type Hash } from 'viem';
import { routerAbi } from '../abi';
import { router } from '../constants';

interface SendDataProps {
  press: Hex;
  data: Hash;
  prepareTxn: boolean;
}

interface SendDataReturn {
  sendDataConfig: PrepareWriteContractResult;
  sendData: (() => void) | undefined;
  sendDataLoading: boolean;
  sendDataSuccess: boolean;
}

export function useSendData({
  press,
  data,
  prepareTxn,
}: SendDataProps): SendDataReturn {
  const { config: sendDataConfig } = usePrepareContractWrite({
    address: router,
    abi: routerAbi,
    functionName: 'sendData',
    args: [press, data],
    value: BigInt(500000000000000), // TODO: determine if this should be hardcoded, maybe even a lookup?
    enabled: prepareTxn,
  });

  const { data: dataToSend, write: sendData } =
    useContractWrite(sendDataConfig);

  const { isLoading: sendDataLoading, isSuccess: sendDataSuccess } =
    useWaitForTransaction({
      hash: dataToSend?.hash,
    });

  return {
    sendDataConfig,
    sendData,
    sendDataLoading,
    sendDataSuccess,
  };
}
