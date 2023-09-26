import React, { useState, useEffect, useCallback } from 'react'
import { Flex, Stack, Debug, Button } from '@river/estuary'
import { useWeb3Storage, useSetupPress } from '@/hooks'
import { ChannelUri } from '../ChannelUri'
import { UploadCard } from './UploadCard'
import {
  Hash,
  encodeAbiParameters,
  parseAbiParameters,
  zeroAddress,
} from 'viem'
import { factory, logic, renderer, zeroHash } from '@/constants'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'

export function NewChannelContainer() {
  const { address } = useAccount()
  const initialAdmin = address || zeroAddress
  const router = useRouter()
  const rendererInit = zeroHash
  const [imageCid, setImageCid] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [uriCid, setUriCid] = useState<string>('')
  const [channelCreated, setChannelCreated] = useState(false)
  const [merkleRoot, setMerkleRoot] = useState<Hash>(zeroHash)

  const { client: web3StorageClient } = useWeb3Storage(uriCid)

  const handleUriUpload = useCallback(async () => {
    const contractUriData = {
      name,
      description,
      image: `ipfs://${imageCid}`,
    }
    const blob = new Blob([JSON.stringify(contractUriData)], {
      type: 'application/json',
    })
    const file = new File([blob], 'schema.json', { type: 'application/json' })
    const schemaCid = await web3StorageClient.put([file], {
      wrapWithDirectory: false,
    })
    setUriCid(`ipfs://${schemaCid}`)
  }, [web3StorageClient, imageCid, name, description])

  const setupInputs: Hash = encodeAbiParameters(
    parseAbiParameters(
      '(string, bytes, address, address, bytes, address, bytes)',
    ),
    [
      [
        name,
        encodeAbiParameters(parseAbiParameters('string'), [uriCid]),
        initialAdmin,
        logic,
        encodeAbiParameters(parseAbiParameters('address[], bytes32'), [
          [initialAdmin],
          merkleRoot,
        ]),
        renderer,
        rendererInit,
      ],
    ],
  )

  const { setupPress, setupPressTxnReceipt } = useSetupPress({
    factory: factory,
    data: setupInputs,
    prepareTxn: uriCid ? true : false,
  })

  useEffect(() => {
    if (uriCid && !channelCreated && setupPress) {
      setChannelCreated(true)
      setupPress?.()
    }
  }, [uriCid, setupPress])

  useEffect(() => {
    if (setupPressTxnReceipt) {
      setTimeout(() => {
        router.push(`/channel/${setupPressTxnReceipt.logs[0].address}`)
      }, 5000)
    }
  }, [setupPressTxnReceipt])

  return (
    <Flex className="flex-wrap md:flex-nowrap md:gap-8">
      {/* First Column: Channel image upload */}
      <UploadCard imageCid={imageCid} setImageCid={setImageCid} />
      {/* Second Column: Channel name + description + create button */}
      <Stack className="h-full justify-top md:justify-end h-[248px]">
        <ChannelUri
          setName={setName}
          name={name}
          setMerkleRoot={setMerkleRoot}
          setDescription={setDescription}
          description={description}
        />

        <Button
          variant="secondary"
          disabled={!(!!imageCid && !!name)}
          onClick={handleUriUpload}
        >
          Create
        </Button>
      </Stack>
    </Flex>
  )
}
