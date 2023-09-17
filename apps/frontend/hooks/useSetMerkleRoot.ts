import { Hash, Hex } from 'viem'
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { logicAbi } from '../abi'
import { createLanyardTree } from '.'
import { useState, useEffect } from 'react'

type Props = {
  merkleRoot: Hash
  press: Hex // we should get their own press contract
  addresses: Hex[]
}

interface UseSetMerkleRootResult {
  config: any
  error: any
  writeMerkleRoot: any
  writeError: any
  data: any
  isError: boolean
  isLoading: boolean
  isSuccess: boolean
  status: any
  mintExistingData: any
  mintExistingLoading: boolean
}

export function useSetMerkleRoot({
  addresses,
  press,
}: Props): UseSetMerkleRootResult {
  const [merkleRoot, setMerkleRoot] = useState<Hash | null>(null)

  useEffect(() => {
    const fetchMerkleRoot = async () => {
      const result = await createLanyardTree(addresses)
      if (result.merkle) {
        setMerkleRoot(result.merkle)
      } else {
        console.error(result.error?.message)
      }
    }

    fetchMerkleRoot()
  }, [addresses])

  const { config, error } = merkleRoot
    ? usePrepareContractWrite({
        address: press, // TODO: update this line
        abi: logicAbi,
        functionName: 'setMerkleRoot',
        args: [press, merkleRoot], // TODO: update this line
        enabled: true,
      })
    : { config: null, error: null }

  const {
    write: writeMerkleRoot,
    data,
    error: writeError,
    isError,
    isLoading,
    isSuccess,
    status,
    // @ts-ignore
  } = useContractWrite(config)

  const { data: mintExistingData, isLoading: mintExistingLoading } =
    useWaitForTransaction({
      hash: data?.hash,
    })

  return {
    config,
    error,
    writeMerkleRoot,
    writeError,
    data,
    isError,
    isLoading,
    isSuccess,
    status,
    mintExistingData,
    mintExistingLoading,
  }
}

export default useSetMerkleRoot
