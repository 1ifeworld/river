import { Flex, Stack } from '@river/estuary';
import { useWeb3Storage, useSetupPress } from '@/hooks';
import { useState, useEffect } from 'react';
import { ChannelUri } from '../ChannelUri';
import { UploadCard } from './UploadCard';
import { CreateChannelButton } from './CreateChannelButton';
import {
  Hex,
  Hash,
  encodeAbiParameters,
  parseAbiParameters,
  zeroAddress,
} from 'viem';
import { factory, logic, renderer, zeroHash } from '@/constants';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import { LanyardMerkle } from './LanyardMerkle';

export function NewChannelContainer() {
  const { address } = useAccount();
  const initialAdmin = address ? address : zeroAddress;

  const router = useRouter();

  const [imageCid, setImageCid] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [uriCid, setUriCid] = useState<string>('');
  const [channelCreated, setChannelCreated] = useState(false);
  const [merkleRoot, setMerkleRoot] = useState<string>('');

  const { client } = useWeb3Storage(uriCid);
  const handleUriUpload = async () => {
    const contractUriData = {
      name,
      description,
      image: `ipfs://${imageCid}`,
    };
    const blob = new Blob([JSON.stringify(contractUriData)], {
      type: 'application/json',
    });
    const file = new File([blob], 'schema.json', { type: 'application/json' });
    const schemaCid = await client.put([file], { wrapWithDirectory: false });
    setUriCid(`ipfs://${schemaCid}`);
  };

  // setup logic inits
  const initialAdminArray: Hex[] = [initialAdmin];
  const initialMerkleRoot = zeroHash
  const logicInit: Hash = encodeAbiParameters(
    parseAbiParameters('address[], bytes32'),
    [initialAdminArray, initialMerkleRoot]
  );
  // setup renderer inits
  const rendererInit = zeroHash
  // encode subinputs
  const encodedUri: Hash = encodeAbiParameters(parseAbiParameters('string'), [
    uriCid,
  ]);
  const setupInputs: Hash = encodeAbiParameters(
    parseAbiParameters(
      '(string, bytes, address, address, bytes, address, bytes)'
    ),
    [[name, encodedUri, initialAdmin, logic, logicInit, renderer, rendererInit]]
  );

  const { setupPress, setupPressTxnReceipt } = useSetupPress({
    factory: factory,
    data: setupInputs,
    prepareTxn: uriCid ? true : false,
  });

  // trigger channel creation once channel uri pinned and state has updated
  useEffect(() => {
    if (!!uriCid && !channelCreated && !!setupPress) {
      setChannelCreated(true);
      setupPress?.();
    }
  }, [uriCid, setupPress]);

  // trigger route change once channel creation is complete
  useEffect(() => {
    if (setupPressTxnReceipt) {
      setTimeout(() => {
        router.push(`/channel/${setupPressTxnReceipt?.logs[0].address}`);
      }, 5000);
    }
  }, [setupPressTxnReceipt]);

  return (
    <Flex className='gap-x-10 h-[248px]'>
      {/* First Column: Channel image upload */}
      <UploadCard imageCid={imageCid} setImageCid={setImageCid} />
      {/* Second Column: Channel name + description + create trigger */}
      <Stack className='h-full justify-end cursor-default'>
        <span className='inline-block mb-5'>
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
  );
}
