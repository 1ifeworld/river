import { Flex, Stack } from '@river/design-system'
import { useWeb3Storage } from '../../../hooks/useWeb3Storage'
import { useState, useEffect } from 'react'
import { ChannelUri } from '../ChannelUri/ChannelUri'
import { UploadCard } from './UploadCard'
import { CreateChannelButton } from '.'
import { useSetupPress } from '../../../hooks'
import {
  Hex,
  Hash,
  encodeAbiParameters,
  parseAbiParameters,
  zeroAddress,
} from 'viem'
import { factory, logic, renderer } from '../../../constants'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'
import { LanyardMerkle } from './LanyardMerkle'

export function NewChannelContainer() {
  const { address } = useAccount()
  const initialAdmin = address ? address : zeroAddress

  const router = useRouter()

  const [imageCid, setImageCid] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [uriCid, setUriCid] = useState<string>('')
  const [channelCreated, setChannelCreated] = useState(false)
  const [merkleRoot, setMerkleRoot] = useState<string>('')

  const { client } = useWeb3Storage(uriCid)
  const handleUriUpload = async () => {
    const contractUriData = {
      name,
      description,
      image: `ipfs://${imageCid}`,
    }
    const blob = new Blob([JSON.stringify(contractUriData)], {
      type: 'application/json',
    })
    const file = new File([blob], 'schema.json', { type: 'application/json' })
    const schemaCid = await client.put([file], { wrapWithDirectory: false })
    setUriCid(`ipfs://${schemaCid}`)
  }

  /* setupPress Hook */
  // setup logic inits
  const initialAdminArray: Hex[] = [initialAdmin]
  const initialMerkleRoot: Hash =
    '0x0000000000000000000000000000000000000000000000000000000000000000'
  const logicInit: Hash = encodeAbiParameters(
    parseAbiParameters('address[], bytes32'),
    [initialAdminArray, initialMerkleRoot],
  )
  // setup rendererInits
  const rendererInit: Hash =
    '0x0000000000000000000000000000000000000000000000000000000000000000'
  // encode sub inputs
  const encodedUri: Hash = encodeAbiParameters(parseAbiParameters('string'), [
    uriCid,
  ])
  const setupInputs: Hash = encodeAbiParameters(
    parseAbiParameters(
      '(string, bytes, address, address, bytes, address, bytes)',
    ),
    [
      [
        name,
        encodedUri,
        initialAdmin,
        logic,
        logicInit,
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

  const newChannelRoute = setupPressTxnReceipt
    ? setupPressTxnReceipt.logs[0].address
    : undefined

  // trigger channel creation once channel uri pinned and state has updated
  useEffect(() => {
    if (!!uriCid && !channelCreated && !!setupPress) {
      setChannelCreated(true)
      setupPress?.()
    }
  }, [uriCid, setupPress])

  // trigger route change once channel creation is complete
  useEffect(() => {
    if (!!newChannelRoute) {
      router.push(`/channel/${newChannelRoute}`)
    }
  }, [newChannelRoute])

  return (
    <Flex className="gap-x-10 h-[248px]">
      {/* First Column: Channel image upload */}
      <UploadCard imageCid={imageCid} setImageCid={setImageCid} />
      {/* Second Column: Channel name + description + create trigger */}
      <Stack className="h-full justify-end cursor-default">
        <span className="inline-block mb-5">
          <ChannelUri
            setName={setName}
            name={name}
            setDescription={setDescription}
            description={description}
          />
          {/* <LanyardMerkle onMerkleRootChange={setMerkleRoot} /> */}
        </span>
        <CreateChannelButton
          createReady={!!imageCid && !!name}
          createTrigger={handleUriUpload}
        />
      </Stack>
    </Flex>
  )
}
