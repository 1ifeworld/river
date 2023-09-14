import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { PrepareWriteContractResult, WriteContractResult } from 'wagmi/actions'
import { type Hex, type Hash, type TransactionReceipt } from 'viem'
import { routerAbi } from '../abi'
import { router } from '../constants'

interface SetupPressProps {
  factory: Hex
  data: Hash
  prepareTxn: boolean
  successCallback?: () => void
}

interface SetupPressReturn {
  setupPressConfig: PrepareWriteContractResult
  setupPress: (() => void) | undefined
  setupPressResult: WriteContractResult | undefined
  setupPressTxnReceipt: TransactionReceipt | undefined
  setupPressLoading: boolean
  setupPressSuccess: boolean
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
  })

  const { data: setupPressResult, write: setupPress } =
    useContractWrite(setupPressConfig)

  const {
    data: setupPressTxnReceipt,
    isLoading: setupPressLoading,
    isSuccess: setupPressSuccess,
  } = useWaitForTransaction({
    hash: setupPressResult?.hash,
    onSuccess() {
      successCallback?.()
    },
  })

  return {
    setupPressConfig,
    setupPress,
    setupPressResult,
    setupPressTxnReceipt,
    setupPressLoading,
    setupPressSuccess,
  }
}
