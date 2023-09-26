import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { PrepareWriteContractResult } from 'wagmi/actions'
import { type Hex, type Hash, parseEther, type TransactionReceipt } from 'viem'
import { routerAbi } from '@/abi'
import { router } from '@/constants'

interface SendDataProps {
  press: Hex
  data: Hash
  value?: string
  prepareTxn: boolean
  successCallback?: () => void
}

interface SendDataReturn {
  sendDataConfig: PrepareWriteContractResult
  sendDataTxnReceipt?: TransactionReceipt
  sendData?: () => void
  sendDataLoading: boolean
  sendDataSuccess: boolean
}

export function useSendData({
  press,
  data,
  value,
  prepareTxn,
  successCallback,
}: SendDataProps): SendDataReturn {
  const { config: sendDataConfig } = usePrepareContractWrite({
    address: router,
    abi: routerAbi,
    functionName: 'sendData',
    args: [press, data],
    value: value ? parseEther(value) : BigInt(0),
    enabled: prepareTxn,
  })

  const { data: dataToSend, write: sendData } = useContractWrite(sendDataConfig)

  const {
    data: sendDataTxnReceipt,
    isLoading: sendDataLoading,
    isSuccess: sendDataSuccess,
  } = useWaitForTransaction({
    hash: dataToSend?.hash,
    onSuccess() {
      successCallback?.()
    },
  })

  return {
    sendDataTxnReceipt,
    sendDataConfig,
    sendData,
    sendDataLoading,
    sendDataSuccess,
  }
}
